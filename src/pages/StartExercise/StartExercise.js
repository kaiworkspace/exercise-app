import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation  } from 'react-router-dom'
import notificationStart from '../../resources/begin.mp3'
import notificationTransition from '../../resources/notification.mp3'
import notificationEnd from   '../../resources/completed.mp3'
import axios from 'axios'

import Footer from '../../components/Footer'

import styles from './style.module.css'
import { FaDumbbell } from 'react-icons/fa'
export default function StartExercise(){
    
    // TODO use props to pass data
    const location = useLocation()
    const [exerciseName, setExerciseName] = useState("Ready")
    const [time, setTime] = useState(0)
    const [exerciseData, setExerciseData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [run, setRun] = useState(false)

    useEffect(()=>{
        getAllData()
        setLoading(false)
    }, [])

    const getAllData = async()=>{
        const params = {id: location.state.data.setId}
        const res = await axios.get('/exercise', {headers: params}).then(response =>{
            const output = JSON.parse(response.data.data)
            setExerciseData(output)
            console.log("Data fetched")
        })
    }

    const startExercise = ()=>{

        const audioStart = new Audio(notificationStart)
        const audioTransition = new Audio(notificationTransition)
        const audioEnd = new Audio(notificationEnd)
        audioStart.loop = false
        audioTransition.loop = false
        audioEnd.loop = false

        setRun(true)

        const data = exerciseData.setExercise
        let exerciseDuration = exerciseData.setDuration
        console.log("data: " + data)

        // wait 3 seconds to begin
        setExerciseName("Begining...")
        setTimeout(()=>{

            data.forEach((exercise, index)=>{
                let counter = exerciseDuration
                setTimeout(()=>{
                    // change display exercise
                    setExerciseName(exercise)
    
                    // play notification sound
                    audioStart.play()
    
                    // loop individual exercise time
                    const interval = setInterval(()=>{
                        setTime(counter)
                        console.log(counter)
                        counter -= 1
                        if(counter == -1){
                            if(data.length-1 == index){
                                setExerciseName("Complete")
                                // play exercise end
                                audioEnd.play()
                                setRun(false)
                            }
                            else{
                                setExerciseName("Transitioning")
                                audioTransition.play()
                            }
                        }
                        if(counter == -6){
                            clearInterval(interval)
                        }
                    }, 1000)
                }, index*(exerciseDuration+6)*1000)
            })
        }, 3000)

    }

    const renderTime=()=>{
        if(time<0){
            return(<div>0</div>)
        }
        else{
            return(<div>{time}</div>)
        }
    }

    const renderStart = ()=>{
        if(run == false){
            return (
                <div className={styles.sth}>
                    <FaDumbbell className={styles.startIconEnable}/>
                    <h2 className={styles.startButtonEnable} onClick={startExercise}>Start</h2>
                </div>
            )
        }
        else{
            return (
                <div className={styles.sth}>
                    <FaDumbbell className={styles.startIconDisable}/>
                    <h2 className={styles.startButtonDisableable} onClick={alert("Workout has alreay started")}>Start</h2>
                </div>
            )
        }
    }

    if(loading){
        return <div>Page is Loading...</div>
    }
    else{
        return (
            <>
                <div>
                    <h3 className={styles.workoutSet}>{exerciseData==null? <>Loading</>: <>{exerciseData.setName}</>}</h3>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.display}>
                        <h1 className={styles.workoutExercise}>{exerciseName}</h1>
                        <h3 className={styles.workoutTimer}>{renderTime()}s</h3>
                    </div>
                </div>
                <div className={styles.startWorkoutContainer}>
                    <div className={run==false? styles.startDiv: styles.startDivDisable}>
                        <FaDumbbell className={run==false? styles.startIconEnable: styles.startIconDisable}/>
                        <h2 className={run==false? styles.startButtonEnable: styles.startButtonDisable} onClick={run==false? startExercise: ()=>{alert("Workout has already started")}}>Start</h2>
                    </div>
                </div>
                <Footer />
                {/* debugging */}
                {/* <button onClick={()=>console.log(exerciseData)}>Press Me</button> */}
                {/* <button onClick={()=>console.log(location.state.data)}>Test State</button> */}
            </>
        )
    }
}