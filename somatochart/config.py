import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    DATABASE = os.getenv(
        'DATABASE',
        os.path.join(
            os.path.dirname(__file__),
            'instance',
            'athletes.db'
        )
    )

    APP = os.getenv('FLASK_APP')

    HOST = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
    PORT = int(os.getenv('FLASK_RUN_PORT', '5000'))
    DEBUG = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
