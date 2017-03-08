import React, {PropTypes, Component} from 'react'
import Article from './Article'

export default class ArticleList extends Component {
	render() {
		const {articles} = this.props

		const articleComponents = articles.map(article => <li key={article.id}>
			<Article article={article}/>
		</li>)

		if (!articles.length) {
			return <div>
				<h3>
					No comments yet
				</h3>
			</div>
		}

		return (
				<ul>
					{articleComponents}
				</ul>
		)
	}
}

ArticleList.propTypes = {
	articles: PropTypes.array.isRequired
}