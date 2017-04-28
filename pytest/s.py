from flask import Flask, request
from gevent.wsgi import WSGIServer
from geventwebsocket import Resource
from collections import OrderedDict

app = Flask(__name__)

@app.route('/')
@app.route('/test')
def hello():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    WSGIServer(('', 5000), Resource(OrderedDict({'^/.*':app}))).serve_forever()
