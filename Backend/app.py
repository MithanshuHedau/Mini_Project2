from flask import Flask, request, jsonify
from flask_cors import CORS
import process_resume

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def home():
    return "🔥 Welcome to the Resume Shortlisting API! 🔥"

@app.route("/shortlist", methods=["POST"])
def shortlist():
    keywords = request.json.get("keywords", "")
    ranked_resumes = process_resume.rank_resumes(keywords)
    return jsonify({"ranked_resumes": ranked_resumes})

if __name__ == "__main__":
    app.run(debug=True)
