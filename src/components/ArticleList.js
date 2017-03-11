import React, {PropTypes, Component} from 'react'
import Article from './Article'
import AccordionDecorator from '../decorators/accordion'


class ArticleList extends Component {
	render() {
		const {articles, isOpen, toggleOpenItem} = this.props

		const articleComponents = articles.map(article => <li key={article.id}>
			<Article article={article}
					 isOpen={isOpen(article.id)}
					 toggleOpen={toggleOpenItem(article.id)}
			/>
		</li>)

		return (
				<ul>
					{articleComponents}
				</ul>
		)
	}
}

export default AccordionDecorator(ArticleList)

ArticleList.propTypes = {
	articles: PropTypes.array.isRequired
}
