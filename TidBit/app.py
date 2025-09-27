from flask import Flask, jsonify

app = Flask(__name__)

# API endpoint
@app.route("/api/message")
def message():
    return jsonify({"message": "Hello from Python backend!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)