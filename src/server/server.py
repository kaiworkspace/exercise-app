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
    # some code here....

    print("Success")
    return jsonify(
        message = "Successfully posted data",
        category = "Success",
        data = "some data",
        status = 200
    )

def createDatabase():
    connection = sqlite3.connect("exercise.db")
    cursor = connection.cursor()
    
    # table for sets
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ExerciseSet(
            setId INT PRIMARY KEY,
            setName TEXT,
            setDuration INT
        )
    """)

    # table for exercises in set
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Exercise(
            exerciseId INT PRIMARY KEY,
            exerciseName TEXT,
            setId INT
        )
    """)

    connection.commit()
    connection.close()

if __name__ == "__main__":
    # createDatabase()
    app.run(port=5000)