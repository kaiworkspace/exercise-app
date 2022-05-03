import React from 'react'

import styles from './style.module.css'

export default function Icon(){
    return (
        <div className={styles.iconContainer}>
            <div className={styles.diamondContainer}>
                <div className={styles.diamond}>
                    <div className={styles.w}>
                        W
                    </div>
                </div>
            </div>
            <div className={styles.title}>
                Workout
            </div>
            <div className={styles.motto}>
                Sweat it out
            </div>
        </div>
    )
}