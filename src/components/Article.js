import React, {PropTypes} from 'react'
import CommentList from './CommentList'
import toggleOpen from '../decorators/toggleOpen'

function Article(props) {
	const {article, isOpen, toggleOpen} = props
	const body = isOpen
			? <section>
		{article.text}
		<CommentList comments={article.comments}/>
	</section>
			: null
	return (
			<div>
				<h3 onClick={toggleOpen}>{article.title}</h3>
				{body}
			</div>
	)
}

Article.propTypes = {
	article: PropTypes.shape({
		title: PropTypes.string.isRequired,
		text: PropTypes.string,
		comments: PropTypes.array
	}).isRequired
}

//нет, зачем, мы же наоборот от него избавились. Задача была создать декоратор для аккордеона и использовать в ArticleList
export default toggleOpen(Article)
