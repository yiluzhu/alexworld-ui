import React, { Component } from 'react'

export default class CommentList extends Component {

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <div className='comment' key={i}>
            <div className='comment-user'>
              <span>{comment.username} </span>：
            </div>
            <p>{comment.content}</p>
          </div>
        )}
      </div>
    )
  }
}
