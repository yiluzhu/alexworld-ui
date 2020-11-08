import React, { Component } from 'react'
import Comment from './Comment'

export default class CommentList extends Component {
  props = {
    comments: []
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <div className='comment' key={i}>
            <div className='comment-user'>
              <span>{this.props.comment.username} </span>：
            </div>
            <p>{this.props.comment.content}</p>
          </div>
        )}
      </div>
    )
  }
}
