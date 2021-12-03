import { useState, useEffect, useCallback, useMemo } from 'react'

import LineChart from './components/Chart/LineChart'
import Filter from './components/Filter/Filter'
import Layout from './components/Layout/Layout'
import Summary from './components/Summary/Summary'

import { getCountries, getReportByCountry } from './api'

function App() {
	const [countries, setCountries] = useState([])
	const [selectedCountryId, setSelectedCountryId] = useState('')
	const [report, setReport] = useState([])
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		getCountries().then((response) => {
			const countries = response.data.sort((a, b) => {
				if (a.Country > b.Country) {
					return 1
				}
				return -1
			})
			setCountries(countries)
			setSelectedCountryId('vn')
		})
	}, [])

	useEffect(() => {
		if (selectedCountryId) {
			const selectedCountry = countries.find(
				(country) => country.ISO2.toLowerCase() === selectedCountryId
			)
			getReportByCountry(selectedCountry.Slug).then((res) => {
				res.data.pop()
				setReport(res.data)
			})
		}
	}, [selectedCountryId, countries])

	const changeCountryHandler = useCallback((event) => {
		setSelectedCountryId(event.target.value)
	}, [])

	const changeFilterHandler = useCallback((event) => {
		setFilter(event.target.value)
	}, [])

	const summary = useMemo(() => {
		if (report && report.length) {
			const latestData = report[report.length - 1]
			console.log(latestData)
			return [
				{
					title: 'Số ca nhiễm',
					data: latestData.Confirmed,
					icon: 'healthicons:virus-alt-outline',
					type: 'confirmed',
				},
				{
					title: 'Chữa khỏi',
					data: latestData.Recovered,
					icon: 'healthicons:health-outline',
					type: 'recovered',
				},
				{
					title: 'Tử vong',
					data: latestData.Deaths,
					icon: 'healthicons:dizzy-outline',
					type: 'death',
				},
			]
		}
		return []
	}, [report])

	return (
		<Layout>
			<Summary summary={summary} />
			<Filter
				countries={countries}
				selectedCountry={selectedCountryId}
				onChangeCountry={changeCountryHandler}
				onChangeFilter={changeFilterHandler}
			/>
			<LineChart
				countryId={selectedCountryId}
				report={report}
				filter={filter}
			/>
		</Layout>
	)
}

export default App
