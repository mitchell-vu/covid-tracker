import React from 'react'
import styles from './Filter.module.css'

const Filter = ({ countries, selectedCountry, onChangeCountry, onChangeFilter }) => {
	return (
		<form className={styles.form}>
			<select
				name='country'
				id='country-selector'
				value={selectedCountry}
				onChange={onChangeCountry}
			>
				{countries.map(({ Country, ISO2 }) => (
					<option key={ISO2} value={ISO2.toLowerCase()}>
						{Country}
					</option>
				))}
			</select>

			<select name='filter' id='filter' onChange={onChangeFilter}>
				<option value='all'>Tất cả</option>
				<option value='7'>7 ngày gần nhất</option>
				<option value='30'>30 ngày gần nhất</option>
				<option value='2021'>2021</option>
				<option value='2020'>2020</option>
			</select>
		</form>
	)
}

export default Filter
