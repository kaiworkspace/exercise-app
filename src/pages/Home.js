import React from 'react'
import { useState, useEffect } from 'react'
import notificationStart from '../resources/notifyStart.wav'
import notificationEnd from   '../resources/notifyEnd.wav'
import axios from 'axios'

export default function Home(){
    
    const [exerciseName, setExerciseName] = useState("")
    const [time, setTime] = useState(0)
    const [exerciseData, setExerciseData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getAllData()

        setLoading(false)
    }, [])

    const getAllData = async()=>{
        const res = await axios.get('/exercise').then(response =>{
            const output = response.data.data
            setExerciseData(output)
            console.log("completed")
        })
    }

    const startExercise = ()=>{

        const audioStart = new Audio(notificationStart)
        const audioEnd = new Audio(notificationEnd)
        audioStart.loop = false
        audioEnd.loop = false

        const data = exerciseData.data
        data.forEach((exercise, index)=>{
            let counter = exercise.duration
            setTimeout(()=>{
                // change display exercise
                setExerciseName(exercise.exerciseName)

                // play notification sound
                audioStart.play()

                // loop individual exercise time
                const interval = setInterval(()=>{
                    setTime(counter)
                    console.log(counter)
                    counter -= 1
                    if(counter == 5){
                        audioEnd.play()
                    }
                    if(counter == -1){
                        clearInterval(interval)
                    }
                }, 200)
            }, index*(exercise.duration+1)*200)
        })
    }

    if(loading){
        return <div>Page is Loading...</div>
    }
    else{
        return (
            <div>
                <h1>{exerciseName}</h1>
                <h3>{time}</h3>
                <button onClick={startExercise}>Hit Me</button>
                <button onClick={()=>console.log(exerciseData)}>Press Me</button>
            </div>
        )
    }
}