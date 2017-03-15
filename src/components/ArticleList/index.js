import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import Article from '../Article/index'
import CSSTransition from 'react-addons-css-transition-group'
import accrdion from '../../decorators/accordion'
import './style.css'

class ArticleList extends Component {
	render() {
		let {articles} = this.props
		const {toggleOpenItem, isItemOpened, filters} = this.props
		const {selected, from, to} = filters

		const from_d = new Date(from).getTime()
		const to_d = new Date(to).getTime()


		if (selected && selected.length || from || to) {
			articles = articles.filter(article => {
				const d = new Date(article.date).getTime();
				let f_sel = false
				let f_d = false

				if (selected && selected.length) {
					f_sel = selected.findIndex(el => el.value === article.id) !== -1
				}
				else {
					f_sel = true
				}

				if (from || to) {
					if (!to) {
						f_d = (d === from_d)
					}
					else {
						f_d = (from_d < d) && (d < to_d)
					}
				}
				else {
					f_d = true
				}

				return f_sel && f_d
			})
		}

		const articleComponents = articles.map(article => <li key={article.id}>
			<Article article={article}
					 isOpen={isItemOpened(article.id)}
					 toggleOpen={toggleOpenItem(article.id)}
			/>
		</li>)

		return (
				<CSSTransition component="ul"
							   transitionName="article-list"
							   transitionAppear={true}
							   transitionAppearTimeout={100}
							   transitionEnterTimeout={500}
							   transitionLeaveTimeout={300}
				>
					{articleComponents}
				</CSSTransition>
		)
	}
}

const mapStateToProps = state => {
	console.log('---', 'connect, state = ', state)
	return {
		articles: state.articles,
		filters: state.filters
	}
}

export default connect(mapStateToProps)(accrdion(ArticleList))

ArticleList.propTypes = {
	articles: PropTypes.array.isRequired,
	isItemOpened: PropTypes.func.isRequired,
	toggleOpenItem: PropTypes.func.isRequired
}