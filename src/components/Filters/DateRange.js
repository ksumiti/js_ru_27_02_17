import React, {Component} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker'
import {connect} from 'react-redux'
import {filterDateArticle} from '../../AC/index'
import 'react-day-picker/lib/style.css'

class DateRange extends Component {
	state = {
		from: null,
		to: null
	}

	handleDayClick = (day) => {
		this.setState(DateUtils.addDayToRange(day, this.state))
	}

	handleDayRange = () => {
		const {from, to} = this.state;
		if (from && to) {
			this.props.filterDateArticle(from, to);
		}
	}

	render() {
		const {from, to} = this.state;
		const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
		this.handleDayRange();
		return (
				<div className="date-range">
					<DayPicker
							ref="daypicker"
							selectedDays={ day => DateUtils.isDayInRange(day, {from, to}) }
							onDayClick={ this.handleDayClick }
					/>
					{selectedRange}
				</div>
		);
	}

}

export default connect(null, {filterDateArticle})(DateRange)