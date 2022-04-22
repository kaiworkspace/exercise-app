import react from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function AddExercise(){

    const [newExercise, setNewExercise] = useState([])
    const [id, setNewId] = useState(1)
    const [setName, setNewSetName] = useState("")
    const [intervalDuration, setIntervalDuration] = useState(1)

    // create new exercise each time '+' is pressed
    const createSet = ()=>{
        const tempSet = newExercise
        const exercise = {exerciseName: "new exercise", exerciseId: id}
        tempSet.push(exercise)
        setNewId(prevId=> prevId + 1)
        setNewExercise(tempSet)
        console.log(newExercise)
    }
    
    const horizontalStyle = { display: 'flex'}

    const handleExerciseNameChange=(event)=>{
        let tempName = event.target.value
        let tempId = event.target.id
        let tempSet = newExercise
        tempSet.forEach((exercise)=>{
            if(exercise.exerciseId == tempId){
                exercise.exerciseName = tempName
            }
        })

        setNewExercise(tempSet)
    }

    const handleSetNameChange=(event)=>{
        let tempSetName = event.target.value
        setNewSetName(tempSetName)
    }

    const handleDurationChange=(event)=>{
        let tempDuration = event.target.value
        setIntervalDuration(tempDuration)
    }

    const renderSets = newExercise.map((eachExercise)=>{
        return (
            <div key={eachExercise.exerciseId}>
                <div style={horizontalStyle}>
                    <h3>Exercise name: </h3> 
                    <input placeholder={eachExercise.exerciseName} id={eachExercise.exerciseId} onChange={handleExerciseNameChange}></input>
                </div>

            </div>
        )
    })

    const saveSet= async ()=>{
        const exerciseSet = {
                                setName: setName,
                                setDuration: intervalDuration,
                                data: newExercise
                            }
        // console.log(exerciseSet)
        let parseSetData = JSON.stringify(exerciseSet)
        // axios post
        const res = await axios.post("/add-exercise", parseSetData)
        console.log(res)
    }

    return (
        <div>
            {/* title */}
            <h1>Add A New Set</h1>

            {/* inputs */}
            <div style={horizontalStyle}>
                <h2>New Set Name: </h2>
                <input placeholder='set name' onChange={handleSetNameChange}></input>
            </div>
            <div style={horizontalStyle}>
                <h2>Exercise interval duration: </h2>
                <input placeholder='seconds' onChange={handleDurationChange}></input>
            </div>

            {renderSets}
            <h2 onClick={createSet}>+</h2>
            <button onClick={saveSet}>Save</button>
        </div>
        
        )

}