import {normalizedComments} from '../fixtures'
import {ADD_COMMENT} from '../constants'

export default (comments = normalizedComments, action) => {
	const {type, payload} = action

	switch (type) {
		case ADD_COMMENT:
			const changed_comments = [...comments]
			const it = changed_comments.push({
				id: payload.id,
				text: payload.text,
				user: payload.user
			})
			console.log('added comment', changed_comments[it-1]);
			return changed_comments
	}

	return comments
}