import React from 'react'

import styles from './style.module.css'

export default function Navbar(){
    return (
        <div className={styles.navBar}>
            <ul className={styles.navBarList}>
                <li><a href='/' className={styles.navBarLinks}>Home</a></li>
                <li><a href='/about' className={styles.navBarLinks}>About</a></li>
                <li><a href='/add-exercise' className={styles.navBarLinks}>Add Exercise</a></li>
            </ul>
        </div>
    )
}