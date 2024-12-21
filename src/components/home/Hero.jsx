import React from 'react'
import { TiTick } from 'react-icons/ti'
import img from '../../../public/cloud-hosting.png'
import Image from 'next/image'
import styles from './Hero.module.css'
const hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.Left}>
                <h1 className={styles.title}>Cloud Hosting</h1>
                <p className={styles.desc}> The best web hosting solution for your online success</p>
                <div className={styles.services}>
                    <div className={styles.serviceItem}>
                        <TiTick />  Easy To Use Control Panel
                    </div >
                    <div className={styles.serviceItem}>
                        <TiTick />  Secure Hosting
                    </div>
                    <div className={styles.serviceItem} >
                        <TiTick />  Website Maintenance
                    </div>
                </div>
            </div>
            <div>
                <Image src={img} alt='cloud' width={500} height={500} />
            </div>
        </div>
    )
}

export default hero
