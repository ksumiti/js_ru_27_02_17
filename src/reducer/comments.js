import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS, LOAD_COMMENTS_BY_PAGE, START, FAIL} from '../constants'
import {arrToMap} from './utils'
import {Record, Map} from 'immutable'

const CommentModel = Record({
	id: null,
	user: '',
	text: ''
})

const DefaultReducerState = Record({
	entities: new Map({}),
	pages: new Map({})
})


export default (comments = new DefaultReducerState(), action) => {
	const {type, payload, randomId} = action

	switch (type) {
		case ADD_COMMENT:
			return comments.set(randomId, new CommentModel({
				id: randomId,
				...payload.comment
			}))

		case LOAD_ARTICLE_COMMENTS + SUCCESS:
			return comments.mergeIn(['entities'], arrToMap(payload.response, CommentModel))

		case LOAD_COMMENTS_BY_PAGE + START:
			return comments.setIn(['pages', payload.page, 'loading'], true)
					.setIn(['pages', payload.page, 'loaded'], false);

		case LOAD_COMMENTS_BY_PAGE + SUCCESS:
			console.log(LOAD_COMMENTS_BY_PAGE + SUCCESS, payload);
			const ids = payload.response.records.map(r => r.id);
			return comments.mergeIn(['entities'], arrToMap(payload.response.records, CommentModel))
					.setIn(['pages', payload.page, 'loading'], false)
					.setIn(['pages', payload.page, 'loaded'], true)
					.setIn(['pages', 'total'], payload.response.total)
					.setIn(['pages', payload.page, 'list'], ids);

		case LOAD_COMMENTS_BY_PAGE + FAIL:
			return comments.setIn(['pages', payload.page, 'loading'], false)
					.setIn(['pages', payload.page, 'loaded'], true);
	}

	return comments
}