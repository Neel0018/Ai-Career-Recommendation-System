from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend_career

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    interest = data.get("interest", "")
    skills = data.get("skills", [])
    academic_score = data.get("academic_score", 0)
    performance = data.get("performance", "")

    result = recommend_career(
        interest,
        skills,
        academic_score,
        performance
    )

    return jsonify(result)
if __name__ == "__main__":
    app.run(debug=True)
