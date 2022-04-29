import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from './style.module.css'

export default function Home(){

    const [allWorkout, setAllWorkout] = useState([])
    const [select, setSelect] = useState([])
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
            )
    })

    const renderStartLink = ()=>{
        if(flag == true){
            return (
                // pass data using state
                <Link to="/start-exercise" state={
                    {
                    data: select
                    }
                }
                >Start</Link>
            )
        }
    }

    return(
        <>
            <div className={styles.quote}>
                <h1>Banner with inspirational quotes</h1>
            </div>
            <div className={styles.main}>
                <div className={styles.mainSub}>
                    <h3>Select workout</h3>
                    <div>{renderWorkout}</div>
                    <Link to='/add-exercise' className={styles.linkAddExercise}>Add Workout</Link>
                </div>
                <div className={styles.mainSub}>
                    <h3>Exercises</h3>
                </div>
            </div>
            {/* TODO: disable link if no exercises are selected */}
            <div className={styles.main}>
                <Link   to='/start-exercise' 
                        className={styles.linkStartExercise}
                        state={{data:select}}>Start Workout</Link>
            </div>
            {/* debugging */}
            <button onClick={()=>console.log(select)}>Show Selected Exercise</button>
        </>
    ) 
}