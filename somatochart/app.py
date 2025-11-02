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


@app.route('/')
def index_page():
    return render_template('index.html')


@app.route('/athletes', methods=['GET'])
def get_athletes():
    docs = list(athletes.find({}))
    for d in docs:
        d['_id'] = str(d['_id'])
    return jsonify(docs)


@app.route('/add_athlete', methods=['POST'])
def add_athlete():
    data = request.get_json()
    if not data or 'x' not in data or 'y' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    athlete = Athlete(data['x'], data['y'], data['name'], data['color'])
    athletes.insert_one(athlete.to_dict())
    return jsonify({'message': 'Athlete added successfully'}), 200


@app.route('/update_athlete/<id>', methods=['PUT'])
def update_athlete(id):
    data = request.get_json()
    update_fields = {}
    if 'x' in data: update_fields['x'] = float(data['x'])
    if 'y' in data: update_fields['y'] = float(data['y'])
    if 'name' in data: update_fields['name'] = data['name']
    if 'color' in data: update_fields['color'] = data['color']

    result = athletes.update_one({'_id': ObjectId(id)}, {'$set': update_fields})
    if result.modified_count > 0:
        return jsonify({'message': 'Athlete updated'}), 200
    return jsonify({'message': 'No changes'}), 404


@app.route('/delete_athlete/<id>', methods=['DELETE'])
def delete_athlete(id):
    try:
        result = athletes.delete_one({'_id': ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Athlete deleted successfully'}), 200
        else:
            return jsonify({'message': 'No Athlete found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run()
