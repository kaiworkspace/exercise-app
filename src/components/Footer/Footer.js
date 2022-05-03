import React from 'react'

import styles from './style.module.css'
import Icon from './Icon'

export default function Footer(){
    return (
        <div className={styles.footerContainer}>
            <div className={styles.logoContainer}>
                <Icon />
            </div>
            <div className={styles.copyrightContainer}>
                Copyright &#169; 2022 Workout, Inc.
            </div>
        </div>
    )
}