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

export function filterTextArticle(text) {
	return {
		type: FILTER_TEXT_ARTICLE,
		payload: {text}
	}
}

export function filterDateArticle(from, to) {
	return {
		type: FILTER_TEXT_ARTICLE,
		payload: {from, to}
	}
}