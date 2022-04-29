import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import StartExercise from "../pages/StartExercise"
import AddExercise from "../pages/AddExercise"
import Home from "../pages/Home"

import Header from "./Header"

export default function App(){
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/start-exercise" element={<StartExercise />}></Route>
                <Route path="/add-exercise" element={<AddExercise />}></Route>
            </Routes>
        </div>
    )
}