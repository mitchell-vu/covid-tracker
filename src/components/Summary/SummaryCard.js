import React from 'react'
import { Icon } from '@iconify/react'
import CountUp from 'react-countup'

import styles from './SummaryCard.module.css'
import Card from '../UI/Card'

const SummaryCard = ({ title, data, type, icon }) => {
	return (
		<Card className={styles['card-container']}>
			<div className={`${styles['card-icon']} ${type}`}>
				<Icon icon={icon} height='30' />
			</div>
			<div className={styles['card-content']}>
				<p className={styles['title']}>{title}</p>
				<h2>
					<CountUp end={data} separator='.' duration={2} />
				</h2>
			</div>
		</Card>
	)
}

export default SummaryCard
