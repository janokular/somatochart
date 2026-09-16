from flask import Flask

from .config import Config
from .routes import register_blueprints
from .db import init_db_app


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_blueprints(app)
    init_db_app(app)

    return app
