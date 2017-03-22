import React, {Component, PropTypes} from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'

class CommentList extends Component {

	static propTypes = {
		comments: PropTypes.array
	}

	static defaultProps = {
		comments: []
	}

	componentDidUpdate() {
		this.size = this.container.getBoundingClientRect()
	}

	render() {
		const {isOpen, toggleOpen} = this.props
//        console.log('---', this.size)
		return (
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
		const {comments, isOpen, onSubmitCommentForm} = this.props
		if (!isOpen) return null

		if (!comments.length) {
			return <div>
				<h3>
					No comments yet
				</h3>
				<NewCommentForm />
			</div>
		}

		const commentItems = comments.map(id => <li key={id}><Comment id={id}/></li>)
		return (
				<div>
					<ul>
						{commentItems}
					</ul>
					<NewCommentForm onSubmit={onSubmitCommentForm}/>
				</div>
		)
	}
}

export default toggleOpen(CommentList)