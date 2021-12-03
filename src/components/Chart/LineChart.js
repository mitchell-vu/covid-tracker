import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import Card from '../UI/Card'

const generateOptions = (report) => {
	const categories = report.map((item) => moment(item.Date).format('DD/MM/YY'))

	return {
		chart: {
			height: 500,
		},
		title: {
			text: 'Tổng ca nhiễm',
		},
		xAxis: {
			categories: categories,
			crosshair: true,
		},
		colors: ['#363636', '#13a351', '#EF4E4E'],
		yAxis: {
			min: 0,
			title: {
				text: null,
			},
			labels: {
				align: 'right',
			},
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y} ca</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: 'Số ca tử vong',
				data: report.map((item) => item.Deaths),
			},
			{
				name: 'Số ca chữa khỏi',
				data: report.map((item) => item.Recovered),
			},

			{
				name: 'Tổng Ca nhiễm',
				data: report.map((item) => item.Confirmed),
			},
		],
	}
}

export default function LineChart({ report, filter }) {
	const [options, setOptions] = useState({})
	console.log(filter)

	useEffect(() => {
		let customReport = []
		switch (filter) {
			case 'all':
				customReport = report
				break
			case '7':
				customReport = report.slice(report.length - 7, report.length)
				break
			case '30':
				customReport = report.slice(report.length - 30, report.length)
				break
			case '2021':
				customReport = report.filter(
					(data) => moment(data.Date).format('YYYY') === '2021'
				)
				break
			case '2020':
				customReport = report.filter(
					(data) => moment(data.Date).format('YYYY') === '2020'
				)
				break

			default:
				customReport = report
				break
		}

		setOptions(generateOptions(customReport))
	}, [report, filter])

	return (
		<Card padding='large'>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</Card>
	)
}
