import {articles} from '../fixtures'
import {FILTER_TEXT_ARTICLE, FILTER_DATE_ARTICLE} from '../constants'

export default (state = articles, action) => {
	const {type, payload} = action
	console.log('action', action);

	switch (type) {
		case FILTER_TEXT_ARTICLE:
			return state.filter(article => article.text.indexOf(payload.text) !== -1)

		case FILTER_DATE_ARTICLE:
			return state.filter(article => payload.from <= article.date && article.date >= payload.to)
	}

	return state
}