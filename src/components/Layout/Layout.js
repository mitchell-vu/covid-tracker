import React from 'react'
import styles from './Layout.module.css'

const Layout = (props) => {
	return (
		<>
			<header className={styles.header}>
				<h1 className='container'>Số liệu COVID-19</h1>
			</header>
			<main className='container'>{props.children}</main>
		</>
	)
}

export default Layout
