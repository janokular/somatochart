from flask import Blueprint
from flask import request
from flask import render_template
from flask import jsonify

from ..db.database import mongo
from ..services.csv_parser import csv_parser


index_bp = Blueprint('bp', __name__)


@index_bp.route('/')
def index():
    return render_template('index.html')


@index_bp.route('/athletes', methods=['GET'])
def get_athletes():
    athletes = list(
        mongo.db.athletes.find({})
    )
    return jsonify(athletes), 200


@index_bp.route('/athletes', methods=['DELETE'])
def delete_athletes():
    if mongo.db.athletes.count_documents({}) == 0:
        return jsonify(msg='Database is already cleared'), 200
    
    result = mongo.db.athletes.delete_many({})

    if result.deleted_count > 0:
        return jsonify(msg='Database cleared successfully'), 200


@index_bp.route('/athletes', methods=['POST'])
def add_athletes_from_csv():
    try:
        csv_file = request.files['file']
        athletes = csv_parser(csv_file)
        
        if athletes:
            mongo.db.athletes.insert_many(athletes)
            return jsonify(msg='Data imported successfully'), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
