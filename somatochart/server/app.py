from flask import Flask, send_from_directory
from os.path import abspath, join, dirname

client_dir = abspath(join(dirname(__file__), '..', 'client'))

app = Flask(__name__,
            static_folder=client_dir,
            template_folder=client_dir)

@app.route('/')
def home():
    return send_from_directory(client_dir, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(client_dir, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
