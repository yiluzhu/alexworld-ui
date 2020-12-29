import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import {rootUrl} from '../../Config'


export default class Comment extends Component {
  state = {
    comments: []
  }

  componentDidMount() {
    this.fetch_comments()
  }

  handleSubmitComment = (comment) => {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: comment.name,
        content: comment.content
      })
    };
    fetch(rootUrl + '/comments', params)
      .then(response => response.json())
      .then(data => {
        console.log('save comments:', data);
        this.fetch_comments()
      })
  }

  fetch_comments = () => {
    fetch(rootUrl + '/comments')
    .then(response => response.json())
    .then(data => this.setState({comments: data.comments}))
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <Link to='/'>
          <div className='text-right mt'>BACK</div>
        </Link>
        <div className='wrapper'>
          <CommentInput onSubmit={this.handleSubmitComment} />
          <CommentList comments={this.state.comments} />
        </div>
      </div>
    )
  }
}
