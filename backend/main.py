from datetime import datetime, timedelta
from typing import Union
from pydantic import BaseModel
import passlib.hash as _hash
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
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
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#Origin cors
origins= [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
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


oAuthScheme= OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    email: Union[str, None]= None
    name: Union[str, None]= None
    
class UserInDB(User):
    hashedPassword: str
    
pwd_context= CryptContext(schemes=["bcrypt"], deprecated= "auto")

#To verify the password inserted with the hash in the Google Sheet
def verifyPassword(Password, hashedPassword):
   return pwd_context.verify(Password, hashedPassword)

@app.post("/token")
async def token(formData: OAuth2PasswordRequestForm= Depends()):
    for i in range(1,len(db)):
    
        if formData.username in db[i][1]:
            
            if verifyPassword(formData.password, db[i][2]):
                return {"response": "grant_type=&username={}&password={}&scope=&client_id=&client_secret=".format(formData.username, formData.password)}
            return {"response": "Invalid user or password"}

    # return {"accessToken": formData.username + "token"}
    return {"response": "User not registered"}

@app.get("/signup")
def signup(token: str= Depends(oAuthScheme)):
    return {"token": token}