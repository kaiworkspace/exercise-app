import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import styles from '../css/style.module.css'

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
            <div key={workout.setId}>
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
        <div>
            <div>
                <h3 className={styles.primary}>Select workout</h3>
                {renderWorkout}
                <button onClick={()=>console.log(select)}>Show Selected Exercise</button>
            </div>
            <div>
                <h3>Start Exercise Set</h3>
                {renderStartLink()}
            </div>
            <div>
                <h3>Add Exercise</h3>
                <Link to="/add-exercise">Add</Link>
            </div>
        </div>
    ) 
}