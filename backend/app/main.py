import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta, datetime, date
from typing import List

# Import our project modules
from . import models, schemas, auth, database
# models.py → SQLAlchemy models (User, Routine, etc.)

# schemas.py → Pydantic schemas (for request/response validation)

# auth.py → login, hashing, JWT creation.

# database.py → DB connection and session creation.

# --- Google Calendar Imports ---Google libraries for API access.
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Google Calendar setup   #Google libraries for API access.
SERVICE_ACCOUNT_FILE = os.path.join(os.getcwd(), "google-credentials.json")
SCOPES = ["https://www.googleapis.com/auth/calendar"]
CALENDAR_ID = "159b0c042667110b1cb29b7c05c37af3c8ec6d2af32346928bca9a6b2caf0929@group.calendar.google.com"

# Initialize credentials
creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("calendar", "v3", credentials=creds)

# --- SETUP ---
models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

# --- CORS MIDDLEWARE ---Allows your frontend (React) to call this backend.

#Without this, the browser would block requests due to CORS policy.
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API ENDPOINTS ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the CureCue API!"}

# ==============================
# AUTHENTICATION ENDPOINTS (REAL)
# ==============================

@app.post("/register", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """Registers a new user."""
    #Checks if the email already exists. If yes → error.
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    # Hashes the password, saves the user in the DB, and returns the new user.
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    db: Session = Depends(database.get_db)
):
    """Logs in a user and returns a JWT token."""
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    #u get a JWT token to authenticate other requests.
    return {"access_token": access_token, "token_type": "bearer"}

# ==============================
# ROUTINES ENDPOINTS (SECURED)
# ==============================

@app.post("/routines/", response_model=schemas.Routine, status_code=status.HTTP_201_CREATED)
def create_routine_for_user(
    routine: schemas.RoutineCreate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user) 
):
    """Creates a routine linked to the currently authenticated user."""
    # Saves the routine to the database.
    db_routine = models.Routine(**routine.dict(), user_id=current_user.id)
    db.add(db_routine)
    db.commit()
    db.refresh(db_routine)
    return db_routine

# Fetches all routines belonging to the logged-in user.
@app.get("/routines/", response_model=List[schemas.Routine])
def read_routines_for_user(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Fetches all routines for the currently authenticated user."""
    routines = db.query(models.User).filter(models.User.id == current_user.id).first().routines
    return routines

# ==============================
# GOOGLE CALENDAR SYNC ENDPOINT
# ==============================

SCOPES = ['https://www.googleapis.com/auth/calendar']
# Path to your credentials file. Adjust if main.py is in a different folder.
SERVICE_ACCOUNT_FILE = 'google-credentials.json' 
CALENDAR_ID = '159b0c042667110b1cb29b7c05c37af3c8ec6d2af32346928bca9a6b2caf0929@group.calendar.google.com'

#Called when the frontend “Sync to Google Calendar” button is clicked.
@app.post("/sync-calendar", status_code=status.HTTP_200_OK)
def sync_to_google_calendar(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Fetches user's routines and adds them to Google Calendar."""
    
    try:
        # Check if the credentials file exists
        if not os.path.exists(SERVICE_ACCOUNT_FILE):
             raise HTTPException(status_code=500, detail=f"Google credentials file not found at {SERVICE_ACCOUNT_FILE}")
        creds = Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        service = build('calendar', 'v3', credentials=creds)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google auth error: {e}")

# reconnects to google calendar and Fetches the current user’s routines from the database.
    routines = db.query(models.User).filter(models.User.id == current_user.id).first().routines
    
    for routine in routines:
        #Converts your routine time (e.g. “8:00 AM”) to a real datetime.
        try:
            time_obj = datetime.strptime(routine.time, '%I:%M %p').time()
            today = date.today()
            start_time = datetime.combine(today, time_obj)
            end_time = start_time + timedelta(minutes=15) # 15 min duration

            event = {
                'summary': routine.name,
                'description': routine.description,
                'start': {'dateTime': start_time.isoformat(), 'timeZone': 'Asia/Kolkata'},
                'end': {'dateTime': end_time.isoformat(), 'timeZone': 'Asia/Kolkata'},
                'recurrence': ['RRULE:FREQ=DAILY'], # Make it repeat daily
            }
            
            service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
        except Exception as e:
            print(f"Error creating event for {routine.name}: {e}")
            pass
            
    return {"message": "Calendar sync completed!"}