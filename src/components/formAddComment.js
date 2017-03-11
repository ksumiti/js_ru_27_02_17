import React, {Component, PropTypes} from 'react'

class formAddComment extends Component {

	static propTypes = {
		onSubmit: PropTypes.func.isRequired
	};

	state = {
		text: '',
		user: ''
	}

	render() {
		return (
				<div>
					<h3>Вы можете добавить комментарий</h3>
					<form ref='form' action="" onSubmit={this.handleSubmitForm}>
						<p>Введите имя: <input name="user" type="text" value={this.state.user}
											   onChange={this.handleUserNameChange}/></p>
						<p>Введите текст комментария:
							<textarea name="text" rows="5" cols="100"  value={this.state.text}  onChange={this.handleTextChange}/>
						</p>
						<input type="submit" value="Добавить"/>
					</form>
				</div>
		)
	}

	handleSubmitForm = ev => {
		ev.preventDefault();
		const {onSubmit} = this.props
		const {user, text} = this.state

		if (user && text) {
			onSubmit({user, text})
		}
	}

	handleUserNameChange = ev => {
		if (ev.target.value.length > 10) return

		this.setState({
			user: ev.target.value
		})
	}

	handleTextChange = ev => {
		if (ev.target.value.length > 150) return

		this.setState({
			text: ev.target.value
		})
	}
}

export default formAddComment