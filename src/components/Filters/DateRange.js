import React, {Component, PropTypes} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class DateRange extends Component {
	static propTypes = {
		from: PropTypes.object,
		to: PropTypes.object,
		onChange: PropTypes.func
	};

	render() {
		const {from, to, onChange} =  this.props
		const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
		return (
				<div className="date-range">
					<DayPicker
							ref="daypicker"
							selectedDays={ day => DateUtils.isDayInRange(day, {from, to}) }
							onDayClick={ onChange }
					/>
					{selectedRange}
				</div>
		);
	}

}

export default DateRange