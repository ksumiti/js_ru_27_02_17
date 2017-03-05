import React from 'react'

export default (props) => {
	const {comment} = props

	return (
			<section>
				<b>{comment.user}:</b><br/>{comment.text}
			</section>
	)
}