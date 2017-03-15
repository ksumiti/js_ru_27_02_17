import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import {connect} from 'react-redux'
import {filterTextArticle} from '../../AC/index'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    state = {
        selected: null
    }

    handleChange = selected => this.setState({ selected })

	handleSelect = selected => this.props.filterTextArticle({ selected })

    render() {
        const { selected } = this.state
        const { articles } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            multi={true}
            onChange={this.handleChange}
        />
    }
}
const mapStateToProps = state => {
	return {
		articles: state.articles,
		filters: state.filters
	}
}

export default connect(mapStateToProps, { filterTextArticle })(SelectFilter)

// export default defaultconnect(null, { filterTextArticle })(SelectFilter)
