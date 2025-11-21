from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify
from bson.objectid import ObjectId
from app.db import get_collection
from app.athlete import Athlete
from app.request_validator import validate_user_request


routes = Blueprint('routes', __name__)
athletes_collection = get_collection('athletes')


@routes.route('/')
def index_page():
    return render_template('index.html')


@routes.route('/athletes', methods=['GET'])
def get_athletes():
    try:
        athletes = list(athletes_collection.find({}))
        for a in athletes:
            a['_id'] = str(a['_id'])
        return jsonify(athletes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@routes.route('/athletes/<id>', methods=['GET'])
def get_athlete(id):
    try:
        athlete = athletes_collection.find_one({'_id': ObjectId(id)})
        if athlete:
            athlete['_id'] = str(athlete['_id'])
            return jsonify(athlete), 200
        return jsonify({'error': 'Athlete not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@routes.route('/athletes', methods=['POST'])
def add_athlete():
    try:
        data = request.get_json()
        errors = validate_user_request(data)
        if errors:
            return jsonify({'errors': errors}), 400

        athlete = Athlete(data['name'],
                          data['endo'],
                          data['meso'],
                          data['ecto'],
                          data['color'],
                          data['symbol'],
                          data['isVisible'])
        
        athletes_collection.insert_one(athlete.to_dict())
        return jsonify({'message': 'Athlete added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@routes.route('/athletes/<id>', methods=['PUT'])
def update_athlete(id):
    try:
        data = request.get_json()
        errors = validate_user_request(data)
        if errors:
            return jsonify({'errors': errors}), 400

        athlete = Athlete(data['name'],
                          data['endo'],
                          data['meso'],
                          data['ecto'],
                          data['color'],
                          data['symbol'],
                          data['isVisible'])

        result = athletes_collection.update_one({'_id': ObjectId(id)}, {'$set': athlete.to_dict()})
        if result.modified_count > 0:
            return jsonify({'message': 'Athlete updated successfully'}), 200
        return jsonify({'error': 'No changes identical data'}), 300
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@routes.route('/athletes', methods=['DELETE'])
def delete_athletes():
    try:
        if athletes_collection.count_documents({}) > 0:
            result = athletes_collection.delete_many({})
            if result.deleted_count > 0:
                return jsonify({'message': 'Database cleared succesfully'}), 200
        return jsonify({'message': 'Database is already cleared'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@routes.route('/athletes/<id>', methods=['DELETE'])
def delete_athlete(id):
    try:
        result = athletes_collection.delete_one({'_id': ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Athlete deleted successfully'}), 200
        return jsonify({'error': 'Athlete not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
