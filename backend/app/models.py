from pymongo.collection import Collection
from .database import db

def get_user_collection() -> Collection:
    return db.users

def get_note_collection() -> Collection:
    return db.notes