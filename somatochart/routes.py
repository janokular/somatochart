from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

from .db import mongo
from .models import Athlete
from .validators import athlete_data_validator
from .csv_handlers import parse_csv_file


main = Blueprint('routes', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/athletes', methods=['GET'])
def get_athletes():
    try:
        athletes = list(mongo.db.athletes.find({}))
        for a in athletes:
            a['_id'] = str(a['_id'])
        return jsonify(athletes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/athletes', methods=['DELETE'])
def delete_athletes():
    try:
        if mongo.db.athletes.count_documents({}) > 0:
            result = mongo.db.athletes.delete_many({})
            if result.deleted_count > 0:
                return jsonify({'message': 'Database cleared successfully'}), 200
        return jsonify({'message': 'Database is already cleared'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main.route('/athletes', methods=['POST'])
def add_athletes_from_csv():
    try:
        csv_file = request.files['file']
        file_data = parse_csv_file(csv_file)

        athletes = []
        for data in file_data:
            errors = athlete_data_validator(data)
            if errors:
                return jsonify({'errors': errors}), 400
        
            athlete = Athlete(**data)

            athletes.append(athlete.to_dict())

        if athletes:
            mongo.db.athletes.insert_many(athletes)

        return jsonify({'message': 'Data imported successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
