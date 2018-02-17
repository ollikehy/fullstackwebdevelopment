import React from 'react'
import BlogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      visible: false,
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user,
      id: props.blog.id
    }
  }

  handleClick = (event) => {
    this.setState({visible : !this.state.visible})
  }

  likeBlog = (event) => {
    console.log(this.state.likes)
    this.setState({likes : this.state.likes + 1})
    console.log(this.state.likes);
    const blogObject = {id: this.state.id,
                        user: this.state.user._id,
                        likes: this.state.likes,
                        author: this.state.author,
                        title: this.state.title,
                        url: this.state.url}
    BlogService.likeBlog(blogObject)
  }

  render() {
    if (this.state.visible) {
      return (
        <div style={blogStyle}>
          <h4 onClick={this.handleClick}>{this.state.title}: {this.state.author}</h4>
          <div>
          <a href={this.state.url}>{this.state.url}</a>
          <div>{this.state.likes} likes
            <button style={buttonStyle} onClick={this.likeBlog}>like</button>
          </div>
          </div>
        </div>
      )
    } else {
    return (
      <div onClick={this.handleClick} style={blogStyle}>
        <h4>{this.state.title}: {this.state.author}</h4>
      </div>
    )
  }
  }
}
const buttonStyle = {
  marginLeft: 5
}

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 2,
  marginBottom: 5
}

export default Blog