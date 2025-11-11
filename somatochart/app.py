from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
from pymongo import MongoClient
from bson.objectid import ObjectId
from athlete import Athlete
import os


app = Flask(__name__)

mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
client = MongoClient(mongo_uri)
db = client['somatochart']
athletes = db['athletes']

REQUIRED_FIELDS = ['endo', 'meso', 'ecto', 'name', 'color', 'symbol', 'isVisible']


@app.route('/')
def index_page():
    return render_template('index.html')


@app.route('/athletes', methods=['GET'])
def get_athletes():
    docs = list(athletes.find({}))
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs)


@app.route('/athletes', methods=['POST'])
def add_athlete():
    try:
        data = request.get_json()
        for key in REQUIRED_FIELDS:
            if key not in data:
                return jsonify({'error': 'Invalid input'}), 400

        athlete = Athlete(data['endo'],
                          data['meso'],
                          data['ecto'],
                          data['name'],
                          data['color'],
                          data['symbol'],
                          data['isVisible'])
        
        athletes.insert_one(athlete.to_dict())
        return jsonify({'message': 'Athlete added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/athletes/<id>', methods=['PUT'])
def update_athlete(id):
    try:
        data = request.get_json()
        for key in REQUIRED_FIELDS:
            if key not in data:
                return jsonify({'error': 'Invalid input'}), 400

        athlete = Athlete(data['endo'],
                          data['meso'],
                          data['ecto'],
                          data['name'],
                          data['color'],
                          data['symbol'],
                          data['isVisible'])

        result = athletes.update_one({'_id': ObjectId(id)}, {'$set': athlete.to_dict()})
        if result.modified_count > 0:
            return jsonify({'message': 'Athlete updated successfully'}), 200
        return jsonify({'message': 'No changes'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/athletes/<id>', methods=['DELETE'])
def delete_athlete(id):
    try:
        result = athletes.delete_one({'_id': ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Athlete deleted successfully'}), 200
        return jsonify({'message': 'Athlete not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run()
