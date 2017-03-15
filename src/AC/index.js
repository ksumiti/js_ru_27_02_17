import {DateUtils} from 'react-day-picker'
import {INCREMENT, DELETE_ARTICLE, FILTER_TEXT_ARTICLE, FILTER_DATE_ARTICLE} from '../constants'

export function increment() {
	const action = {
		type: INCREMENT
	}

	return action
}

export function deleteArticle(id) {
	return {
		type: DELETE_ARTICLE,
		payload: {id}
	}
}

export function filterTextArticle(selected) {
	return {
		type: FILTER_TEXT_ARTICLE,
		payload: {selected}
	}
}

export function filterDateArticle(day) {
	const range = DateUtils.addDayToRange(day, window.store.getState().filters)
	return {
		type: FILTER_DATE_ARTICLE,
		payload: range
	}
}