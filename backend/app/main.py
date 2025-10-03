# --- MAIN FASTAPI APP ---
# In backend/app/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

# Import all the modules we've created
from . import models, schemas, auth, database

# This command tells SQLAlchemy to create all the tables defined in models.py
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# --- CORS MIDDLEWARE ---
# This allows our React frontend to communicate with our backend
origins = [
    "http://localhost:3000",
    "http://localhost:5173", # The default port for Vite/React
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
    """A welcome message for the API root. Helps to check if the server is running."""
    return {"message": "Welcome to the CureCue API!"}


# ==============================
# AUTHENTICATION ENDPOINTS
# ==============================

@app.post("/register", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """Registers a new user after checking for duplicates and validating password length."""
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        hashed_password = auth.get_password_hash(user.password)
    except ValueError:
        # This block catches the error for passwords longer than 72 characters.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password is too long. Please use a password with 72 characters or less."
        )

    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    """Logs in a user, verifies credentials, and returns a JWT access token."""
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    try:
        # We wrap the password verification in a try...except block
        if not user or not auth.verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except ValueError:
        # This will catch the "password is too long" error during login
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# ==============================
# ROUTINES ENDPOINTS (SECURITY TEMPORARILY DISABLED FOR TESTING)
# ==============================

@app.post("/routines/", response_model=schemas.Routine, status_code=status.HTTP_201_CREATED)
def create_routine_for_user(
    routine: schemas.RoutineCreate,
    db: Session = Depends(database.get_db)
):
    """Creates a new routine for a hardcoded user (ID=1). SECURITY DISABLED FOR TESTING."""
    # We are hardcoding user_id=1 for now so we don't need to be logged in.
    db_routine = models.Routine(**routine.dict(), user_id=1)
    db.add(db_routine)
    db.commit()
    db.refresh(db_routine)
    return db_routine

@app.get("/routines/", response_model=List[schemas.Routine])
def read_routines_for_user(db: Session = Depends(database.get_db)):
    """Fetches all routines for our hardcoded test user (ID=1)."""
    # We are hardcoding user_id=1 to fetch routines without being logged in.
    routines = db.query(models.Routine).filter(models.Routine.user_id == 1).all()
    return routines