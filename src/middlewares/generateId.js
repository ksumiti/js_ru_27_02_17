import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    console.log('---', 'before: ', store.getState())
	if (action.type === ADD_COMMENT) {
		const id = window.store.getState().comments.length + 1;
		next({ ...action, payload: { ...action.payload, id } })
	} else {
		next(action)
	}
    console.log('---', 'after:', store.getState())
}