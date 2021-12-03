import React from 'react'
import SummaryCard from './SummaryCard'
import styles from './Summary.module.css'

const Summary = ({ summary }) => {
	return (
		<div className={styles['summary-grid']}>
			{summary.map((card) => (
				<SummaryCard
					key={card.type}
					title={card.title}
					data={card.data}
                    icon={card.icon}
					type={card.type}
					// icon={data.icon}
				/>
			))}
		</div>
	)
}

export default Summary
