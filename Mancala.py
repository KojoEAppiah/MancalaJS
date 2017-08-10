from Flask import Flask, render_template, request

app = Flask(__name__)

APPLICATION_NAME = "Mancala"

@app.route('/play')
def play():
	pass

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=8080)