from flask import Flask

from .config import Config
from .routes import register_blueprints
from .db.database import mongo


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_blueprints(app)
    mongo.init_app(app)

    return app
