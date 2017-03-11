import React from 'react'

export default (CustomComponent) => class AccordionDecorator extends React.Component {
	state = {
		openItemId: null
	}

	isOpen = itemId => itemId === this.state.openItemId

	toggleOpenItem = openItemId => ev => {
		ev.preventDefault()
		this.setState({
			openItemId
		})
	}

	render() {
		return <CustomComponent {...this.props} isOpen={this.isOpen} toggleOpenItem={this.toggleOpenItem}/>
	}
}