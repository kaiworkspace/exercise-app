import react from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './style.module.css'
import Footer from '../../components/Footer'

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
                <div className={styles.newExercise}>
                    <h3>Exercise name: </h3> 
                    <input 
                        className={styles.textFieldsContainer}
                        placeholder={eachExercise.exerciseName} 
                        id={eachExercise.exerciseId} 
                        onChange={handleExerciseNameChange}>        
                    </input>
                </div>

            </div>
        )
    })

    const saveSet= async ()=>{

        validateInputs()

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
        
        clearFields()
        alert("New workout created")
    }

    const validateInputs=()=>{
        // TODO
    }

    const clearFields=()=>{
        // TODO
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1>Add A New Workout</h1>
                </div>

                <div className={styles.addContainer}>
                    <div className={styles.middleContainer}>
                        <div className={styles.subContainer}>
                            <div>
                                <h2>New Workout Name: </h2>
                            </div>
                            <div className={styles.textFieldsContainer}>
                                <input placeholder='workout name' onChange={handleSetNameChange}></input>
                            </div>
                        </div>
                        <div className={styles.subContainer}>
                            <div>
                                <h2>Exercise interval duration: </h2>
                            </div>
                            <div className={styles.textFieldsContainer}>
                                <input placeholder='seconds' onChange={handleDurationChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.middleContainer}>
                        {renderSets}
                        <h2 className={styles.plus} onClick={createSet}>+</h2>
                    </div>
                </div>
                <div>
                    <h3 className={styles.saveContainer} onClick={saveSet}>Save</h3>
                </div>
            </div>
            <Footer />
        </>
        )

}