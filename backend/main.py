from datetime import datetime, timedelta
from typing import Union, List
from pydantic import BaseModel, ValidationError
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import FastAPI, Depends, Security, status, HTTPException
from fastapi.security import (
    OAuth2PasswordBearer, 
    OAuth2PasswordRequestForm,
    SecurityScopes
)
#Sheets
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
#Cors
from starlette.middleware.cors import CORSMiddleware
#Environment variables
import json



def usersDb():
    SCOPES= ['https://www.googleapis.com/auth/spreadsheets']
    SERVICE_ACCOUNT_FILE= "keys.json"
    
    credentials = None
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, 
        scopes=SCOPES
    )
    #Spreadsheeet ID
    SPREADSHEET_ID = '1FWCWX9MJv0bUIfjaXb-_WY656WdBk_qe6GGqLGsZSAI'
    
    try:
        service = build('sheets', 'v4', credentials=credentials)
    
        sheet = service.spreadsheets()
        result = sheet.values().get(
            spreadsheetId=SPREADSHEET_ID,
            range='login!A1:C5'
        ).execute()
        
        values= result.get("values", [])
        return values
    
    except HttpError as err:
        print(err)
        
    
db= usersDb()
SECRET_KEY= "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM= "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES= 30

#Origin cors
origins= [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1",
    "http://localhost"
]

app= FastAPI()

#Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context= CryptContext(schemes=["bcrypt"], deprecated= "auto")

oAuthScheme= OAuth2PasswordBearer(
    tokenUrl="token",
    scopes= {"me": "me", "items": "items"}
)

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    username: Union[str, None]= None
    scopes: List[str]= []

class User(BaseModel):
    username: Union[str, None]= None
    name: Union[str, None]= None
    # disabled: Union[bool, None]= None
    
class UserInDB(User):
    hashedPassword: str

#To verify the password inserted with the hash in the Google Sheet
def verifyPassword(Password, hashedPassword):
   return pwd_context.verify(Password, hashedPassword)

def getUser(db, username: str):
    for i in range(1,len(db)):
    
        if username in db[i][1]:
            return db[i]
    return False

def authenticateUser(db, username: str, password: str):
    user= getUser(db, username)
    
    if not user:
        return False
    if not verifyPassword(password, user[2]):
        return False
    
    return user

def createAccessToken(data: dict, expiresDelta: Union[timedelta, None]= None):
    toEncode= data.copy()
    if expiresDelta:
        expire= datetime.utcnow() + expiresDelta
    else:
        expire= datetime.utcnow() + timedelta(minutes= 15)
    toEncode.update({"exp": expire})
    encodedJwt= jwt.encode(toEncode, SECRET_KEY, algorithm= ALGORITHM)
    
    return encodedJwt

async def getCurrentUser(
    security_scopes: SecurityScopes, 
    token: str= Depends(oAuthScheme) 
):
    if security_scopes.scopes:
        authenticateValue= f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticateValue= f'Bearer'
    credentialsException= HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail= "Could not validate the credentials",
        headers= {"WWW-Authenticate": authenticateValue},
    )
    try:
        payload= jwt.decode(token, SECRET_KEY, algorithms= [ALGORITHM])
        username: str= payload.get("sub")
        if username is None:
            raise credentialsException
        tokenScopes= ["me", "items"]
        token_data= TokenData(scopes= tokenScopes, username= username)
    except (JWTError, ValidationError):
        print("error")
        raise credentialsException
        
    user= getUser(db, username= token_data.username)
    
    if user is None:
        raise credentialsException
    for scope in security_scopes.scopes:
        
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code= status.HTTP_401_UNAUTHORIZED,
                detail= "Not enough permissions",
                headers= {"WWW-Authenticate": authenticateValue}
            )
        
    return user
    
async def getCurrentActiveUser(
    currentUser: User= Security(
        getCurrentUser, 
        scopes= ["me"]
    )
):
    return currentUser

@app.post(
    path="/token",
    response_model= Token
)
async def token(formData: OAuth2PasswordRequestForm= Depends()):
    user= authenticateUser(db, formData.username, formData.password)
    if not user:
        raise HTTPException(
            status_code= 400,
            detail= "Incorrect username or password",
        )
    print("User", user)
    accessTokenExpires= timedelta(minutes= ACCESS_TOKEN_EXPIRE_MINUTES)
    accessToken= createAccessToken(
        data= {
            "sub": user[1],
            "scopes": formData.scopes
        },
        expiresDelta= accessTokenExpires
    )
    
    return {"access_token": accessToken, "token_type": "bearer"}

@app.get("/users/me")
async def getUserData(currentUser: User= Depends(getCurrentActiveUser)):
    print(currentUser)
    return {"username":currentUser[1], "name": currentUser[0]}
     

    
@app.get("/signup")
def signup(token: str= Depends(oAuthScheme)):
    return {"token": token}

@app.get("/status/")
async def read_system_status(current_user: User = Depends(getCurrentUser)):
    return {"status": "ok"}
