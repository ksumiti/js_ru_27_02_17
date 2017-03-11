import React from 'react'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'

import 'react-day-picker/lib/style.css'

export default class Range extends React.Component {
	state = {
		from: null,
		to: null
	}

	handleDayClick = day => {
		const range = DateUtils.addDayToRange(day, this.state)
		this.setState(range)
	}

	handleResetClick = ev => {
		ev.preventDefault()
		this.setState({
			from: null,
			to: null
		})
	}

	render() {
		const { from, to } = this.state
		return (
				<div className="RangeExample">
					{ !from && !to && <p>Выбери <strong>начальную дату</strong>.</p> }
					{ from && !to && <p>Выбери <strong>конечную дату</strong>.</p> }
					{ from && to &&
					<p>
						Выбранный период: { moment(from).format('L') } - { moment(to).format('L') }.
						{ ' ' }<a href="." onClick={ this.handleResetClick }>Reset</a>
					</p>
					}
					<DayPicker
							numberOfMonths={ 2 }
							selectedDays={ [from, { from, to }] }
							onDayClick={ this.handleDayClick }
					/>
				</div>
		)
	}

}