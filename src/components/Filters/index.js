import React, { Component, PropTypes } from 'react'
import ArticlesSelect from './ArticlesSelect'
import DateRange from './DateRange'
import {connect} from 'react-redux'
import {filterTextArticle, filterDateArticle} from '../../AC/index'


class Filters extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    render() {
		const {articles, filters, filterTextArticle, filterDateArticle} = this.props

		return (
            <div>
				<ArticlesSelect articles={articles} selected={filters.selected} onChange={filterTextArticle}/>
                <DateRange from={filters.from} to={filters.to} onChange={filterDateArticle}/>
            </div>
        )
    }
}

export default connect((state) => ({
	articles: state.articles,
	filters: state.filters
}), {
	filterTextArticle,
	filterDateArticle
})(Filters)