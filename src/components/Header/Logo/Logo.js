import React from 'react'

import styles from './style.module.css'

export default function Logo(){
    return (
        <>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoDiamond}>
                        <h3 className={styles.logoText}>W</h3>
                    </div>
                </div>
                <div>
                    <h3 className={styles.logoTitle}>Workout</h3>
                    <h4 className={styles.logoMotto}>Sweat it off</h4>
                </div>
            </div>
        </>
    )
}