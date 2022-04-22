import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home(){

    // fetch info from server

    return(
        <div>
            <div>
                <h3>Select workout</h3>
                {/* TODO: load user set */}
            </div>
            <div>
                <h3>Start Exercise Set</h3>
                <Link to="/start-exercise" onClick={console.log("Hello world")}>Start</Link>
            </div>
            <div>
                <h3>Add Exercise</h3>
                <Link to="/add-exercise" onClick={console.log("BYE")}>Add</Link>
            </div>
        </div>
    ) 
}