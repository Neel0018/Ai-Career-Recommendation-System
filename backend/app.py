from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_career

app = Flask(__name__)
CORS(app)

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    interest = data.get("interest")
    performance = data.get("performance")

    result = recommend_career(interest, performance)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)