from unicodedata import category
from debugpy import connect
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import sqlite3

app = Flask(__name__)

# TO DO modify return data to select from db
@app.route("/exercise")
def exercise():
    exerciseArr = []
    connection = sqlite3.Connection('exercise.db')
    cursor = connection.cursor()

    # TODO someway to get user targetID
    # print(request.args.get('id'))
    targetID = request.headers.get('id')

    # fetch exercise
    cursor.execute("""
        SELECT E.exerciseName from Exercise E, ExerciseSet ES
        WHERE E.setId = ES.setId
        AND ES.setId = ?
    """, (targetID,))
    targetExercise = cursor.fetchall()
    for items in targetExercise:
        exerciseArr.append(items[0])

    # fetch set
    cursor.execute("""
        SELECT ES.* from ExerciseSet ES
        WHERE ES.setId = ?
    """, (targetID,))
    targetSet = cursor.fetchone()
    setName = targetSet[1]
    setDuration = targetSet[2]

    connection.close()

    data = {
        "setId": targetID,
        "setName": setName,
        "setDuration": setDuration,
        "setExercise": exerciseArr
    }

    jsonData = json.dumps(data)

    return jsonify(
        message = "Successfully fetched data",
        data = jsonData, 
        status = 200
    )

@app.route("/add-exercise", methods=["POST"])
def postExercise():
    setInfo = request.get_data()
    exerciseObj = json.loads(setInfo)
    # print(exerciseObj)
    setName = exerciseObj['setName']
    setDuration = exerciseObj['setDuration']
    setExercises = exerciseObj['data']
    # print(setExercises)
    
    # add exerciseObj to db
    connection = sqlite3.Connection('exercise.db')
    cursor = connection.cursor()
    # set
    cursor.execute("""
        INSERT INTO ExerciseSet(setName, setDuration) VALUES(?,?)
    """, (setName, setDuration,))

    # get the latest setId
    cursor.execute("""
        SELECT max(setId) FROM ExerciseSet
    """)
    latestId = cursor.fetchone()
    
    # exercise
    for items in setExercises:
        cursor.execute("""
            INSERT INTO Exercise(exerciseName, setId) VALUES(?,?)
        """, (items['exerciseName'], latestId[0],))
    
    connection.commit()
    connection.close()

    print("Data successfully added")
    return jsonify(
        message = "Successfully posted data",
        category = "Success",
        data = "some data",
        status = 200
    )

@app.route('/submit-feedback', methods=['POST'])
def PostFeedback():
    data = json.loads(request.get_data())
    email = data['email']
    feedback = data['feedback']
    line = email + ',' + feedback
    with open('feedback.txt', 'a') as file:
        file.writelines(line+'\n')
    file.close()

    return(
        jsonify(
        message = "Successfully posted data ",
        category = "Success",
        data = "ok",
        status = 200
        )
    )

@app.route('/home', methods=["GET"])
def getAllWorkout():
    workoutArr = []
    # get data from database
    connection = sqlite3.Connection('exercise.db')
    cursor = connection.cursor()
     
    # all exercises
    cursor.execute("""
        SELECT E.exerciseId, E.exerciseName, E.setId FROM Exercise E
    """)
    allExercise = cursor.fetchall()

    # all workouts
    cursor.execute("""
        SELECT ES.setId, Es.setName, ES.setDuration FROM ExerciseSet ES
    """)
    allWorkout = cursor.fetchall()

    allData = []
    for workout in allWorkout:
        exerciseArr = []
        for exercise in allExercise:
            if(workout[0] == exercise[2]):
                exerciseArr.append(exercise[1])
        workoutObj = {
            "setId": workout[0], 
            "setName": workout[1],
            "setExercise": exerciseArr
            }
        allData.append(workoutObj)
    print(allData)
    jsonData = json.dumps(allData)

    return jsonify(
        message = "Successfully fetched data ",
        category = "Success",
        data = jsonData,
        status = 200
    )


def createDatabase():
    connection = sqlite3.connect("exercise.db")
    cursor = connection.cursor()
    
    # table for sets
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ExerciseSet(
            setId INTEGER PRIMARY KEY AUTOINCREMENT,
            setName TEXT,
            setDuration INT
        )
    """)

    # table for exercises in set
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Exercise(
            exerciseId INTEGER PRIMARY KEY AUTOINCREMENT,
            exerciseName TEXT,
            setId INT
        )
    """)

    connection.commit()
    connection.close()
    print("database created")

if __name__ == "__main__":
    createDatabase()
    app.run(debug=True,port=5000)