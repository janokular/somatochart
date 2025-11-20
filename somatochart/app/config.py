from os import getenv


class Config:    
    MONGO_URI = getenv('MONGO_URI', 'mongodb://localhost:27017/somatochart')
