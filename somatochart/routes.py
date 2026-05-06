from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

from .db import mongo
from .models import Athlete
from .validators import athlete_data_validator
from .csv_handlers import file_reader


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


@main.route('/athletes', methods=['POST'])
def add_athlete():
    try:
        athlete_data = request.get_json()
        errors = athlete_data_validator(athlete_data)
        if errors:
            return jsonify({'errors': errors}), 400
        
        athlete = Athlete(
            name=athlete_data['name'],
            endo=athlete_data['endo'],
            meso=athlete_data['meso'],
            ecto=athlete_data['ecto'],
            color=athlete_data['color'],
            symbol=athlete_data['symbol'],
            isVisible=athlete_data['isVisible']
        )
        
        if athlete:
            mongo.db.athletes.insert_one(athlete.to_dict())
        
        return jsonify({'message': 'Athlete added successfully'}), 200
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


@main.route('/import', methods=['POST'])
def import_csv():
    try:
        file = request.files['file']
        file_data = file_reader(file)

        athletes = []
        for athlete_data in file_data:
            errors = athlete_data_validator(athlete_data)
            if errors:
                return jsonify({'errors': errors}), 400
        
            athlete = Athlete(
                name=athlete_data['name'],
                endo=athlete_data['endo'],
                meso=athlete_data['meso'],
                ecto=athlete_data['ecto'],
                color=athlete_data['color'],
                symbol=athlete_data['symbol'],
                isVisible=athlete_data['isVisible']
            )

            athletes.append(athlete.to_dict())

        if athletes:
            mongo.db.athletes.insert_many(athletes)

        return jsonify({'message': 'Data imported successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
