import React, { Component } from 'react'

export default class CommentList extends Component {

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <div className='comment' key={i}>
            <div className='comment-datetime'> 
              {comment.timestamp}
            </div>
            <div className='comment-user'>
              <span>{comment.name} </span>：
              <p>{comment.content}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}
