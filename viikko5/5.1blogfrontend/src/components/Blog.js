import React from 'react'



class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: props.title,
      author: props.author,
      url: props.url
    }
  }

  handleClick = (event) => {
    this.setState({visible : !this.state.visible})
  }

  render() {
    if (this.state.visible) {
      const likes = !this.state.likes ? 0 : this.state.likes
      return (
        <div onClick={this.handleClick} style={blogStyle}>
          {this.state.title}: {this.state.author}
          <div>
          <a href={this.state.url}>{this.state.url}</a>
          <div>Likes: {likes}</div>
          </div>
        </div>
      )
    } else {
    return (
      <div onClick={this.handleClick} style={blogStyle}>
        {this.state.title}: {this.state.author}
      </div>
    )
  }
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