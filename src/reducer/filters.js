import {FILTER_TEXT_ARTICLE, FILTER_DATE_ARTICLE} from '../constants'

export default (state = {from: null, to: null, selected: null}, action) => {
	const {type, payload} = action

	switch (type) {
		case FILTER_TEXT_ARTICLE:
			const {selected} = payload
	            //а здесь лучше просто id хранить, а не все что в Select приходит
			return Object.assign({}, state, {
				selected: selected
			})

		case FILTER_DATE_ARTICLE:
			const {from, to} = payload
			return Object.assign({}, state, {
				from: from || null,
				to: to || null,
			})
	}

	return state
}
