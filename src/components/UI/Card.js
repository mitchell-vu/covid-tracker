import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
    let cardClass = `${styles.card} ${props.className}`
    if (props.padding === 'large') {
        cardClass += ` ${styles['padding-large']}`
    }
    return (
        <div className={cardClass}>
            {props.children}
        </div>
    )
}

export default Card
