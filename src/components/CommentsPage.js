import React, {Component, PropTypes} from 'react'
import CommentList from './CommentListByPage'
import Menu, {MenuItem} from './Menu/index'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {loadCommentsByPage} from '../AC'
import {connect} from 'react-redux'


class CommentsPage extends Component {
	static propTypes = {};

	componentWillReceiveProps({total, loadCommentsByPage}) {
		if (!total) loadCommentsByPage(1)
	}

	render() {
		const {match, total} = this.props;

		if (!total) {
			return null
		}
		const menuItems = []
		const pages = Math.ceil(total/5);


		for (let i = 1; i < pages;i++) {
			menuItems.push(<MenuItem key={`page-${i}`} path={`${match.url}/${i}`}/>)
		}

		return (
			<div>
				Pages of comments: {total}
				<Menu>
					{menuItems}
				</Menu>
				<Switch>
					<Route path={`${match.url}/:page`} render={this.getPage}/>
				</Switch>
			</div>
		)
	}

	getPage({match}) {
		return <CommentList match={match}/>
	}
}

const mapStateToProps = (state) => {
	return {
		total: state.comments.getIn(['pages', 'total'])
	}
}

export default connect(mapStateToProps, {loadCommentsByPage})(CommentsPage)