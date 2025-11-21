from pymongo import MongoClient
from app.config import Config


def get_db():
    client = MongoClient(Config.MONGO_URI)
    return client.get_database()


def get_collection(name):
    db = get_db()
    return db.get_collection(name)
