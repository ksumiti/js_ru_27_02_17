import React, {Component, PropTypes} from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
	static propTypes = {
		articles: PropTypes.array.isRequired,
		selected: PropTypes.array,
		onChange: PropTypes.func
	};

	render() {
		const {articles, selected, onChange} = this.props
		const options = articles.map(article => ({
			label: article.title,
			value: article.id
		}))

		return <Select
				options={options}
				value={selected}
				multi={true}
				onChange={onChange}
		/>
	}
}

export default SelectFilter