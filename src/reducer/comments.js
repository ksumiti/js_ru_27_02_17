import {ADD_COMMENT, LOAD_COMMENTS_BY_ARTICLEID, START, SUCCESS, FAIL} from '../constants'
import {arrToMap} from './utils'
import {Record, Map} from 'immutable'

const CommentModel = Record({
	id: null,
	user: '',
	text: '',
})

const DefaultReducerState = Record({
	entities: new Map({}),
    //здесь так просто уже не выйдет, ведь ты загружаешь не все комменты сразу, а отдельно для каждой статьи
	loading: false,
	error: null
})

export default (state = new DefaultReducerState(), action) => {
	const {type, payload, error, randomId} = action

console.log('reducer comments', payload, state);
	switch (type) {
		case ADD_COMMENT:
			return state.setIn(['entities', randomId], new CommentModel(payload.comment))

		case LOAD_COMMENTS_BY_ARTICLEID + START:
			return state.set('loading', true)

		case LOAD_COMMENTS_BY_ARTICLEID + SUCCESS:
			return state
					.mergeIn(['entities'], arrToMap(payload.response, CommentModel))
					.set('loading', false)

		case LOAD_COMMENTS_BY_ARTICLEID + FAIL:
			return state
					.set('error', error.statusText)
					.set('loading', false)
	}

	return state
}
