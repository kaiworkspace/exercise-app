from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

userData = {"data": [
    {   
        "exerciseName": "Upward Dog",
        "duration": 50
    }, 
    {   
        "exerciseName": "and sth else..",
        "duration": 50
    }
    ]}


@app.route("/exercise")
def exercise():
    return jsonify(
        message = "Successfully fetched data",
        data = userData, 
        status = 200
    )

if __name__ == "__main__":
    app.run(port=5000)