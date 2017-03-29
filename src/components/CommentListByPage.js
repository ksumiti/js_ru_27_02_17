import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader'
import {loadCommentsByPage} from '../AC'
import Comment from './Comment'

class CommentsListByPage extends Component {

	componentWillReceiveProps({loading, loaded, match, loadCommentsByPage}) {
		if (!loading && !loaded) loadCommentsByPage(match.params.page)
	}

	render() {
		const {comments, error, loading, loaded} = this.props
		if (error) {
			return <h1>{error}</h1>
		}

		if (loading) {
			return <Loader />
		}

		if (!loaded) {
			return null
		}
		const commentItems = comments.map(id => <li key={id}><Comment id={id}/></li>)

		return (
				<ul>
					{commentItems}
				</ul>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const page = ownProps.match.params.page;

	return {
		comments: state.comments.getIn(['pages', page, 'list']),
		loading: state.comments.getIn(['pages', page, 'loading']),
		loaded: state.comments.getIn(['pages', page, 'loaded']),
		error: state.comments.getIn(['pages', page, 'error'])
	}
}

export default connect(mapStateToProps, {loadCommentsByPage})(CommentsListByPage)
