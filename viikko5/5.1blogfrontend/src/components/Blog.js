import React from 'react'
import BlogService from '../services/blogs'
import { Button } from 'semantic-ui-react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes,
      user: props.blog.user ? props.blog.user : {username: 'Anonymous'},
      id: props.blog.id,
      signedUser: props.signedUser
    }
  }

  handleClick = (event) => {
    this.setState({visible : !this.state.visible})
  }

  delete = (event) => {
    if (window.confirm("Halautko varmasti poistaa tämän blogin?")) {
      if (this.state.user.username === this.state.signedUser.username) {
        BlogService.deleteBlog(this.state.id, this.state.signedUser.token)
      } else if (this.state.user.username === 'Anonymous') {
        BlogService.deleteBlog(this.state.id, this.state.signedUser.token)
      }
    }
    window.location.reload()
  }

  likeBlog = (event) => {
    this.setState({likes : this.state.likes + 1})
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
        <div className="fullView" style={blogStyle}>
          <h4 onClick={this.handleClick}>{this.state.title}: {this.state.author}</h4>
          <div>
          <a href={this.state.url}>{this.state.url}</a>
          <div>{this.state.likes} likes &nbsp; &nbsp;
            <Button color="instagram" onClick={this.likeBlog}>like</Button>
          </div>
          <p>Added by {this.state.user.username}</p>
          <DeleteButton user={this.state.user} signedUser={this.state.signedUser} onClick={this.deleteBlog}/>
          </div>
        </div>
      )
    } else {
    return (
      <div className="simpleView" onClick={this.handleClick} style={blogStyle}>
        <h4>{this.state.title}: {this.state.author}</h4>
      </div>
    )
  }
  }
}

const DeleteButton = (props) => {
  if (props.user.username === props.signedUser.username || props.user.username === 'Anonymous') {
    return (
      <div>
        <Button color="red" onClick={props.onClick}>poista</Button>
      </div>
    )
  } else {
    return null
  }
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