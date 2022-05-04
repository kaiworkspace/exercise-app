import React, { useState } from 'react'

import { FaGithub, FaLinkedin, FaGoogle, FaInstagramSquare } from 'react-icons/fa'
import styles from './style.module.css'
import Footer from '../../components/Footer'
import { clear } from '@testing-library/user-event/dist/clear'

export default function About(){

    const [message, setMessage] = useState("")

    const handleIconClick = ()=>{
        setMessage("Coming soon...")
        setTimeout(()=>{
            setMessage("")
        }, 3000)
    }

    const validateTextFields=()=>{
        // TO DO
    }

    const saveTextFields=()=>{
        // TO DO
    }

    const clearTextFields=()=>{
        // TO DO
    }

    const handleSubmitButtonClick=()=>{
        validateTextFields()
        saveTextFields()
        clearTextFields()
        alert("Thankyou! Your response has been submitted")
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
                    <input className={styles.email} placeholder='email'></input>
                    <div>
                        <textarea className={styles.para} placeholder="I'm sweating it..." />
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