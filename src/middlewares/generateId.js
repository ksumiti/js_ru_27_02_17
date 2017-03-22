import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    console.log('---', 'before: ', store.getState())
	    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
	if (action.type === ADD_COMMENT) {
		//зачем window?
	        //завязка на length - очень плохая логика, что если удалят коммент?
		const id = window.store.getState().comments.length + 1;
		next({ ...action, payload: { ...action.payload, id } })
	} else {
		next(action)
	}
    console.log('---', 'after:', store.getState())
}
