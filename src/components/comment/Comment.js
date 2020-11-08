import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'


export default class Comment extends Component {
  props = {
    comments: []
  }

  render() {
    return (
      <div>
        <div className='wrapper'>
          <CommentInput />
          <CommentList />
        </div>
      </div>
    )
  }
}
