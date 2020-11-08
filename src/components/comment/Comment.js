import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import CommentInput from './CommentInput'
import CommentList from './CommentList'


export default class Comment extends Component {
  state = {
    comments: []
  }

  // componentDidMount() {
  //   fetch(rootUrl + '/comments')
  //   .then(response => response.json())
  //   .then(data => this.setState({
  //     comments: data.comments}))
  // }

  handleSubmitComment = (comment) => {
    // this.props.comments.push(comment)
    this.state.comments.push(comment)
    this.setState({
      comments: this.state.comments
    })
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
