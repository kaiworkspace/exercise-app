from unicodedata import category
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import sqlite3

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

@app.route("/add-exercise", methods=["POST"])
def postExercise():
    setInfo = request.get_data()
    exerciseObj = json.loads(setInfo)
    print(exerciseObj)

    # add exerciseObj to db
    connection = sqlite3.connect("exercise.db")
    cursor = connection.cursor()
    
    # table for sets
    

    # table for exercises in set


    print("Success")
    return jsonify(
        message = "Successfully posted data",
        category = "Success",
        data = "some data",
        status = 200
    )

if __name__ == "__main__":
    app.run(port=5000)