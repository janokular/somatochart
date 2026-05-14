from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

from .db import mongo
from .csv_parser import csv_parser


main = Blueprint('routes', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/athletes', methods=['GET'])
def get_athletes():
    try:
        athletes = list(
            mongo.db.athletes.find({}, {'_id': 0})
        )
        return jsonify(athletes), 200
    except Exception as e:
        return jsonify(msg=str(e)), 500


@main.route('/athletes', methods=['DELETE'])
def delete_athletes():
    try:
        if mongo.db.athletes.count_documents({}) == 0:
            return jsonify({'message': 'Database is already cleared'}), 200
            
        result = mongo.db.athletes.delete_many({})

        if result.deleted_count > 0:
            return jsonify(msg='Database cleared successfully'), 200
    except Exception as e:
        return jsonify(msg=str(e)), 500


@main.route('/athletes', methods=['POST'])
def add_athletes_from_csv():
    try:
        csv_file = request.files['file']
        athletes = csv_parser(csv_file)

        if athletes:
            mongo.db.athletes.insert_many(athletes)
            return jsonify(msg='Data imported successfully'), 200
    except Exception as e:
        return jsonify(msg=str(e)), 500
