import {normalizedArticles} from '../fixtures'
import {DELETE_ARTICLE, ADD_COMMENT} from '../constants'

export default (state = normalizedArticles, action) => {
	const {type, payload} = action

	switch (type) {
		case DELETE_ARTICLE:
			return state.filter(article => article.id !== payload.id)

		case ADD_COMMENT:
			const aID = state.findIndex(a => a.id === payload.article)
			const changed_state = [...state]
		        //здесь ты мутируешь стейт. Возвращаешь новый массив, но внутри меняешь объекты по ссылке
			const it = changed_state[aID].comments.push(payload.id)
			console.log('added comment to article', changed_state[aID].comments[it - 1]);
			return changed_state
	}

	return state
}
