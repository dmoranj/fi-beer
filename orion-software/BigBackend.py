from flask import Flask
from flask import jsonify

app = Flask(__name__)
import HiveClient

@app.route("/last/<mins>")
def lastMinutes(mins):
    return jsonify(minutes=mins, data=HiveClient.showLast(int(mins)))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)

