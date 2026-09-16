from .database import (
    close_db,
    init_db,
)


def init_db_app(app):
    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db()
