from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_career

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    if not data:
        return jsonify([])

    interest = data.get("interest")
    performance = data.get("performance")

    if not interest or not performance:
        return jsonify([])

    result = recommend_career(interest, performance)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
