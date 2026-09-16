import json

from flask import (
    Blueprint,
    jsonify,
    render_template,
    request,
)

from ..services.csv_parser import csv_parser
from ..db.database import get_db


index_bp = Blueprint('index', __name__)


@index_bp.route('/')
def index():
    return render_template('index.html')


@index_bp.route('/athletes', methods=['GET'])
def get_athletes():
    db = get_db()

    rows = db.execute(
        'SELECT * FROM athletes'
    ).fetchall()

    athletes = []

    for row in rows:
        athlete = json.loads(row['data'])
        athletes.append(athlete)

    return jsonify(athletes), 200


@index_bp.route('/athletes', methods=['DELETE'])
def delete_athletes():
    db = get_db()

    count = db.execute(
        'SELECT COUNT(*) AS count FROM athletes'
    ).fetchone()['count']

    if count == 0:
        return jsonify(msg='Database is already cleared'), 200

    db.execute('DELETE FROM athletes')
    db.commit()

    return jsonify(msg='Database cleared successfully'), 200


@index_bp.route('/athletes', methods=['POST'])
def add_athletes_from_csv():
    try:
        if 'file' not in request.files:
            return jsonify(error='No file uploaded'), 400

        csv_file = request.files['file']
        athletes = csv_parser(csv_file)

        if not athletes:
            return jsonify(error='No athlete data found'), 400

        db = get_db()

        db.executemany(
            'INSERT INTO athletes (data) VALUES (?)',
            [
                (json.dumps(athlete),)
                for athlete in athletes
            ]
        )

        db.commit()

        return jsonify(
            msg='Data imported successfully',
            count=len(athletes)
        ), 200

    except Exception as error:
        return jsonify(error=str(error)), 500

