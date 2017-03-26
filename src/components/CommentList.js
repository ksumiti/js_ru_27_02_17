import React, {Component, PropTypes} from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import Loader from './Loader'
import {connect} from 'react-redux'
import {loadCommentsByArticleId} from '../AC'

class CommentList extends Component {

	static propTypes = {
		article: PropTypes.object.isRequired
	}

	componentWillReceiveProps({isOpen, article, loadCommentsByArticleId}) {
		if (!this.props.isOpen && isOpen && !article.loadedComments && !article.comments.loading) loadCommentsByArticleId(article.id)
	}

	render() {
		const {isOpen, toggleOpen, error, loading} = this.props

		if (error) {
			return <h1>{error}</h1>
		}
		return (loading ? <Loader /> :
						<div ref={this.getContainerRef}>
							<a href="#" onClick={toggleOpen}>{isOpen ? 'hide' : 'show'} comments</a>
							{this.getBody()}
						</div>
		)
	}

	getContainerRef = (ref) => {
		this.container = ref
		if (ref) {
			this.size = ref.getBoundingClientRect()
		}
	}

	getBody() {
		const {article, isOpen} = this.props
		if (!isOpen) return null

		if (!article.loadedComments || !article.comments || !article.comments.length) {
			return <div>
				<h3>
					No comments yet
				</h3>
				<NewCommentForm articleId={article.id}/>
			</div>
		}

		const commentItems = article.comments.map(id => <li key={id}><Comment id={id}/></li>)
		return (
				<div>
					<ul>
						{commentItems}
					</ul>
					<NewCommentForm articleId={article.id}/>
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.comments.loading,
		error: state.comments.error
	}
}

export default connect(mapStateToProps, {loadCommentsByArticleId})(toggleOpen(CommentList))