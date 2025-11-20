from flask import Flask
from pymongo import MongoClient
from app.config import Config
from app.routes import routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()
    app.athletes_collection = db["athletes"]
    
    app.register_blueprint(routes)
    return app
