import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from './style.module.css'
import banner from '../../resources/banner2.jpg'

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

    const renderExercise=()=>{
        // console.log(select)
        if(flag==false){
            return (<p>Hello world</p>)
        }
        else{
            select.setExercise.map((exercise)=>{
                console.log(exercise)
            })
            
        }
    }

    const renderStartLink =()=>{
        if(flag == true){
            return (
                <Link   
                    to='/start-exercise' 
                    className={styles.linkEnableStartExercise}
                    state={{data:select}}
                    >Start Workout
                </Link>
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
            <div>
                Description
            </div>
            <div className={styles.main}>
                <div className={styles.mainSub}>
                    <h3>Select workout</h3>
                    <div>{renderWorkout}</div>
                    <Link to='/add-exercise' className={styles.linkAddExercise}>Add Workout</Link>
                </div>
                <div className={styles.mainSub}>
                    <h3>Exercises</h3>
                    <div>{flag? select.setExercise.map((exercise, index)=>{
                        return <h4 key={index}>{exercise}</h4>
                    }): <h4>Select a workout</h4> }</div>
                </div>
            </div>
            <div className={styles.main}>
                {renderStartLink()}
            </div>
            {/* debugging */}
            <button onClick={()=>console.log(select)}>Show Selected Exercise</button>
        </>
    ) 
}