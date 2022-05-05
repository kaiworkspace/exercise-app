import React, { useState } from 'react'

import { FaGithub, FaLinkedin, FaGoogle, FaInstagramSquare } from 'react-icons/fa'
import styles from './style.module.css'
import Footer from '../../components/Footer'
import { validEmail } from './Regex'
import axios from 'axios'

export default function About(){

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [feedbackError, setFeedbackError] = useState(false)

    const handleIconClick = ()=>{
        setMessage("Coming soon...")
        setTimeout(()=>{
            setMessage("")
        }, 3000)
    }

    const validateTextFields=()=>{
        // TO DO
        if(!validEmail.test(email)){
            setEmailError(true)
            alert("invalid email")
        }else{
            setEmailError(false)
        }
        // check if message > 0
        
        if(feedback.length <= 0){
            setFeedbackError(true)
            alert("Feedback is empty")
        }else if(feedback.length > 500){
            setFeedbackError(true)
            alert("Please keep feedback to below 500 chars")
        }else{
            setFeedbackError(false)
        }

    }

    const clearTextFields=()=>{
        setEmail("")
        setFeedback("")
    }

    const handleSubmitButtonClick= async()=>{
        validateTextFields()
        if(emailError==false && feedbackError==false){
            // send data to server
            const data = JSON.stringify({email: email, feedback: feedback})
            const res = await axios.post("/submit-feedback", data)
            if(res.data.data == 'ok'){
                alert("Successfully submitted feedback")
                clearTextFields()
            }
            else{
                alert("Sever error, Please try again")
            }
            
        }
    }

    return (
        <>  
            <h2 className={styles.title}>About Us</h2>
            <div className={styles.aboutDescription}>
                <p>A student project to design a workout webapplication that enables users to customise different exercises they wish to do in their workout</p>
                <p>By (just one random guy on a chair)</p>
            </div>
            <div>
                <div className={styles.iconContainer}>
                    <FaGithub className={styles.icon} onClick={handleIconClick}/>
                    <FaLinkedin className={styles.icon} onClick={handleIconClick}/>
                    <FaGoogle className={styles.icon} onClick={handleIconClick}/>
                    <FaInstagramSquare className={styles.icon} onClick={handleIconClick}/>
                </div>
                <div className={styles.message}>
                    {message}
                </div>
            </div>
            <div className={styles.contactContainer}>
                <div>
                    <h2>Got an idea or suggestions? Let us know!</h2>
                    <input 
                        className={emailError==false? styles.emailPass: styles.emailFail} 
                        placeholder='email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}>
                    </input>
                    <div className={styles.feedbackContainer}>
                        <textarea 
                            className={styles.para} 
                            placeholder="I'm sweating it..." 
                            value={feedback}
                            onChange={(e)=>{setFeedback(e.target.value)}}/>
                        <p className={styles.charCount}>{feedback.length}/500</p>
                    </div>
                    <div className={styles.submitContainer}>
                        <h3 className={styles.submit} onClick={handleSubmitButtonClick}>Submit</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}