from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('chat')
def handle_chat(json):
    print('json: ' + str(json))
    emit('chat', json, broadcast=True)

if __name__ == '__main__':
        socketio.run(app)

