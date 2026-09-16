from flask import Flask

from .config import Config
from .routes import main
from .db import mongo


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(main)

    mongo.init_app(app)

    return app
