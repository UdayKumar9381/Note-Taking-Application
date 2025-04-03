from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from . import schemas, auth, database
from .models import get_user_collection, get_note_collection
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .schemas import User, Note, NoteUpdate 
from bson import ObjectId

# ✅ Define the app before using it
app = FastAPI()

# ✅ Now use app.add_middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Match your React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class LoginRequest(BaseModel):
    email: str
    password: str

# User Registration & Login Endpoints
@app.post("/register")
async def register(user: schemas.User):
    users = get_user_collection()
    existing_user = await users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.pwd_context.hash(user.password)
    await users.insert_one({"username": user.username, "email": user.email, "password": hashed_password})
    return {"message": "User registered"}

@app.post("/login")
async def login(user: LoginRequest):
    users = get_user_collection()
    user_data = user.dict()  # Explicitly convert Pydantic model to dictionary
    db_user = await users.find_one({"email": user_data["email"]})

    if not db_user or not auth.pwd_context.verify(user_data["password"], db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": db_user["email"]})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/verify-token")
async def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = auth.verify_token(token)
        return {"valid": True}
    except HTTPException:
        raise

# Note CRUD Endpoints
@app.post("/notes")
async def create_note(note: schemas.Note, token: str = Depends(oauth2_scheme)):
    notes = get_note_collection()
    await notes.insert_one(note.dict())
    return {"message": "Note created"}

from bson import ObjectId

# Update your CRUD endpoints to handle ObjectId:

@app.get("/notes")
async def get_notes(user_id: str, token: str = Depends(oauth2_scheme)):
    try:
        notes = get_note_collection()
        user_notes = await notes.find({"user_id": user_id}).to_list(100)
        # Convert ObjectId to string
        for note in user_notes:
            note["_id"] = str(note["_id"])
        return user_notes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/notes/{note_id}")
async def update_note(note_id: str, note_data: NoteUpdate, token: str = Depends(oauth2_scheme)):
    try:
        notes = get_note_collection()
        update_data = {k: v for k, v in note_data.dict().items() if v is not None}
        result = await notes.update_one(
            {"_id": ObjectId(note_id)},
            {"$set": update_data}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Note not found")
        return {"message": "Note updated"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str, token: str = Depends(oauth2_scheme)):
    try:
        notes = get_note_collection()
        result = await notes.delete_one({"_id": ObjectId(note_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Note not found")
        return {"message": "Note deleted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))