import mariadb
from flask import Flask, Response, json, jsonify, request

app = Flask(__name__)

conn = mariadb.connect(
    user="root",
    password="root",
    port=3306,
    database="entities",
    host="db"
)
cur = conn.cursor()

cur.execute(f"SELECT * FROM providers")
providers = []
for name, latitude, longitude, last_updated, description in cur.fetchall():
    providers.append({'name': name,
                    'latitude': float(latitude), 'longitude': float(longitude),
                    'last_updated': last_updated,
                    'description': description})


@app.route('/', methods=['GET'])
def hello_world():
    return "Hello world!"

@app.route('/providers/', methods=['GET'])
def get_providers():
    """Return top 3 closest, or last updated providers"""
    latitude = request.args.get('latitude', None)
    longitude = request.args.get('longitude', None)
    if latitude and longitude:
        providers.sort(key=lambda p:
            abs(float(latitude) - p['latitude']) +
            abs(float(longitude) - p['longitude'])
        )
    else:
        providers.sort(key=lambda p: p['last_updated'])

    return jsonify(providers[:3])


@app.errorhandler(Exception)
def get_exception_response(e: Exception):
    print(e)
    response = Response(json.dumps(e.__dict__), status = 500)
    return response

@app.route('/user/', methods=['POST'])
def create_user():
    email = request.args.get('email')
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    print(email, latitude, longitude)
    try:
        cur.execute(
            f"INSERT INTO user VALUES (?, ?, ?)",
            (email, latitude, longitude)
        )
        response = Response(
            f"Created user: ({email}, {latitude}, {longitude})",
            status = 200
        )
        conn.commit()
    except Exception as e:
        response = get_exception_response(e)
        conn.rollback()

    return jsonify(response)


@app.route('/providers/subscribe/', methods=['POST'])
def subscribe_providers():
    email = request.args.get('email')
    providers_names = request.args.get('providers_names')
    try:
        for providers in providers_names:
            cur.execute(
                f"INSERT INTO subscription VALUES (?, ?)",
                (email, providers)
            )
        response = Response(
            f"Created new subscription: ({email}, {providers})",
            status = 200
        )
        conn.commit()
    except Exception as e:
        response = get_exception_response(e)
        conn.rollback()

    return jsonify(response)
