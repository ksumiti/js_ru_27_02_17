import {
		INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT,
		LOAD_ALL_ARTICLES, LOAD_ARTICLE_BY_ID, LOAD_ARTICLE_COMMENTS, START, SUCCESS, FAIL, LOAD_COMMENTS_BY_PAGE, LOAD_TOTAL_COMMENTS
} from '../constants'
import $ from 'jquery'

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

export function changeDateRange(dateRange) {
	return {
		type: CHANGE_DATE_RANGE,
		payload: {dateRange}
	}
}

export function changeSelection(selected) {
	return {
		type: CHANGE_SELECTION,
		payload: {selected}
	}
}

export function addComment(comment, articleId) {
	return {
		type: ADD_COMMENT,
		payload: {comment, articleId},
		generateId: true
	}
}

export function loadAllArticles() {
	return {
		type: LOAD_ALL_ARTICLES,
		callAPI: '/api/article'
	}
}

export function checkAndLoadArticleComments(articleId) {
	return (dispatch, getState) => {
		const article = getState().articles.getIn(['entities', articleId])
		if (article.commentsLoaded || article.commentsLoading) return

		dispatch({
			type: LOAD_ARTICLE_COMMENTS + START,
			payload: {articleId}
		})

		setTimeout(() => {
			$.get(`/api/comment?article=${articleId}`)
					.done(response => dispatch({
						type: LOAD_ARTICLE_COMMENTS + SUCCESS,
						payload: {response, articleId}
					}))
					.fail(error => dispatch({
						type: LOAD_ARTICLE_COMMENTS + FAIL,
						payload: {error, articleId}
					}))
		}, 1000)
	}
}

export function loadArticleById(id) {
	return (dispatch) => {
		dispatch({
			type: LOAD_ARTICLE_BY_ID + START,
			payload: {id}
		})

		setTimeout(() => {
			$.get(`/api/article/${id}`)
					.done(response => dispatch({
						type: LOAD_ARTICLE_BY_ID + SUCCESS,
						payload: {response, id}
					}))
					.fail(error => dispatch({
						type: LOAD_ARTICLE_BY_ID + FAIL,
						payload: {error, id}
					}))
		}, 1000)
	}
}

export function loadCommentsByPage(page) {
	return (dispatch) => {
		dispatch({
			type: LOAD_COMMENTS_BY_PAGE + START,
			payload: {page}
		})

		const limit = 5
		const offset = limit * page

		setTimeout(() => {
			$.get(`/api/comment?limit=${limit}&offset=${offset}`)
					.done(response => dispatch({
						type: LOAD_COMMENTS_BY_PAGE + SUCCESS,
						payload: {response, page}
					}))
					.fail(error => dispatch({
						type: LOAD_COMMENTS_BY_PAGE + FAIL,
						payload: {error, page}
					}))
		}, 1000)
	}
}
//ок, но я бы не делал дополнительного вызова
export function loadTotalComments() {
	return (dispatch) => {
		setTimeout(() => {
			$.get(`/api/comment?limit=1&offset=1`)
					.done(response => dispatch({
						type: LOAD_TOTAL_COMMENTS + SUCCESS,
						payload: {response}
					}))
					.fail(error => dispatch({
						type: LOAD_TOTAL_COMMENTS + FAIL,
						payload: {error}
					}))
		}, 1000)
	}
}
