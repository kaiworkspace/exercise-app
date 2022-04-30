import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation  } from 'react-router-dom'
import notificationStart from '../../resources/begin.mp3'
import notificationTransition from '../../resources/notification.mp3'
import notificationEnd from   '../../resources/completed.mp3'
import axios from 'axios'

export default function StartExercise(){
    
    // TODO use props to pass data
    const location = useLocation()
    const [exerciseName, setExerciseName] = useState("")
    const [time, setTime] = useState(0)
    const [exerciseData, setExerciseData] = useState(null)
    const [loading, setLoading] = useState(true)

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

        const data = exerciseData.setExercise
        let exerciseDuration = exerciseData.setDuration
        console.log("data: " + data)
        // TODO update function
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
                    if(counter == 0){
                        if(data.length-1 == index){
                            setExerciseName("Complete")
                            // play exercise end
                            audioEnd.play()
                        }
                        else{
                            setExerciseName("Transitioning")
                            audioTransition.play()
                        }
                    }
                    if(counter == -6){
                        clearInterval(interval)
                    }
                }, 200)
            }, index*(exerciseDuration+6)*200)
        })
    }

    const renderTime=()=>{
        if(time<0){
            return(<div>0</div>)
        }
        else{
            return(<div>{time}</div>)
        }
    }

    if(loading){
        return <div>Page is Loading...</div>
    }
    else{
        return (
            <div>
                <h1>{exerciseName}</h1>
                <h3>{renderTime()}</h3>
                <button onClick={startExercise}>Start</button>
                <button onClick={()=>console.log(exerciseData)}>Press Me</button>
                <button onClick={()=>console.log(location.state.data)}>Test State</button>
            </div>
        )
    }
}