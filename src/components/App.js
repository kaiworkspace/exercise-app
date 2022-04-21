import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "../pages/Home"
import AddExercise from "../pages/AddExercise"

export default function App(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/add-exercise" element={<AddExercise />}></Route>
            </Routes>
        </div>
    )
}