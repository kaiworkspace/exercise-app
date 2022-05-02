import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from './style.module.css'
import { IoCreate } from "react-icons/io5"
import { FaDumbbell, FaMousePointer } from "react-icons/fa"

export default function Home(){

    const [allWorkout, setAllWorkout] = useState([])
    const [select, setSelect] = useState({})
    const [flag, setFlag] = useState(false)
    // fetch info from server
    const fetchWorkOut = async ()=>{
        const res = await axios.get('/home').then(response =>{
            const output = JSON.parse(response.data.data)
            setAllWorkout(output)
        })
    }

    useEffect(()=>{
        fetchWorkOut()
    }, [])

    const renderWorkout = allWorkout.map((workout)=>{
        return (
            <div className={styles.workoutSelContainer}>
                <div 
                    className={styles.workoutSel}
                    key={workout.setId}>
                    <h3 onClick={()=>{
                        setSelect(workout)
                        setFlag(true)
                    }}>
                        {workout.setName}
                    </h3>
                </div>
            </div>
            )
    })

    const renderStartLink =()=>{
        if(flag == true){
            return (
                <>
                    
                    <Link   
                        to='/start-exercise' 
                        className={styles.linkEnableStartExercise}
                        state={{data:select}}
                        >Start Workout
                    </Link>
                </>
            )
        }

        else{
            return (
                <Link   
                    to='/start-exercise' 
                    className={styles.linkDisableStartExercise}
                    state={{data:select}}
                    onClick={(event)=> {
                        event.preventDefault()
                        // TODO: notify user to sel
                        alert("Please select a workout")
                        }}
                    >Start Workout
                </Link>
            )
        }
    }

    return(
        <>  
            <div className={styles.quoteContainer}>
                <div className={styles.quote}>
                    <h1>The Journey of a thousand miles</h1>
                    <h1>Begins with a single step</h1>
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.description}>
                    Take your first step with Workout. Control what exercise to do, how you want to do it.  
                </div>
            </div>
            <div className={styles.stepsContainer}>
                <div className={styles.step}>
                    <IoCreate className={styles.icons}/>
                    <h4 className={styles.stepTitle}>Step 1</h4>
                    <h4>Create Your Workout Routines</h4>
                </div>
                <div className={styles.step}>
                    <FaMousePointer className={styles.icons}/>
                    <h4 className={styles.stepTitle}>Step 2</h4>
                    <h4>Select Your Workout Routines</h4>
                </div>
                <div className={styles.step}>
                    <FaDumbbell className={styles.icons}/>
                    <h4 className={styles.stepTitle}>Step 3</h4>
                    <h4>Start Working Out</h4>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.mainSub}>
                    <h3>Select workout</h3>
                    <div>{renderWorkout}</div>
                    <Link to='/add-exercise' className={styles.linkAddExercise}>Create New Workout +</Link>
                </div>
                <div className={styles.mainSub}>
                    <h3>Exercises</h3>
                    <div>{flag? select.setExercise.map((exercise, index)=>{
                        return (<h4 key={index} className={styles.exercise}>{exercise}</h4>)
                    }): <h4>Select a workout</h4> }</div>
                </div>
            </div>
            <div className={styles.startWorkoutContainer}>
                {renderStartLink()}
            </div>
            {/* debugging */}
            <button onClick={()=>console.log(select)}>Show Selected Exercise</button>
        </>
    ) 
}