import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {

	constructor() {
		super()
		this.state = {
			isOpen: false
		}
	}

	render() {
		const {comments} = this.props
		const {isOpen} = this.state
		const commentComponents = comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)
		const body = isOpen ? <ul>{commentComponents}</ul> : null
		const action = isOpen ? 'close' : 'open'
		return (
				<div>
					<h3 onClick={this.handleClick}>Comments ({action})</h3>
					{body}
				</div>
		)
	}

	handleClick = (ev) => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
}

export default CommentList