# Fast API and Sheets

## Google Sheets data structure
![](./backend/assets_readme/sheets.png) 

## Install modules and dependencies 

- Open a cmd, and execute the command `pip install -r requirements.txt`

- After install the project dependencies, you must download your file `key.json`,
to do that you have to go to Google Developers, enable your api with google sheets,
and create a Google Service Account, after you create that, you can download the file .json
and you only have to rename it, or change the path for the file to the `SERVICE_ACCOUNT_FILE` 
in the file `main.py`

- Finally, you can start your development server with FastAPI running the following command
in the cmd `uvicorn main:app`