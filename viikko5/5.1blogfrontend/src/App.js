import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { newBlog, blogInit } from './reducers/blogReducer'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      newBlog: '',
      url: '',
      author: '',
    }
  }

  componentDidMount() {
    this.props.blogInit()
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      console.log(exception)
      this.props.notify('virheellinen käyttäjätunnus tai salasana', 5)
    }
  }  

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.author,
      title: this.state.newBlog,
      url: this.state.url,
      likes: 0
    }

    this.props.newBlog(blogObject)

    this.setState({
      newBlog: '',
      author: '',
      url: ''
    })
    this.props.notify(`blogi ${blogObject.title}, ${blogObject.author} lisätty`, 5)
    }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogOut = (event) => {
    window.localStorage.clear()
    window.location.reload()
  }

  handleBlogChange = (event) => {
    this.setState({ newBlog : event.target.value})
  }

  handleAuthorChange = (event) => {
    this.setState({ author : event.target.value})
  }

  handleUrlChange = (event) => {
    this.setState({ url : event.target.value})
  }

  render() {
    const blogsList = () => (
      <BlogList
        handleLogOut={this.handleLogOut}
        username={this.state.username}
        addBlog={this.addBlog}
        newBlog={this.state.newBlog}
        author={this.state.author}
        url={this.state.url}
        handleBlogChange={this.handleBlogChange}
        handleAuthorChange={this.handleAuthorChange}
        handleUrlChange={this.handleUrlChange}
        blogs={this.props.blogs}
        user={this.state.user}
        userToken={this.state.user.token}
        store={this.props.store}
      />
    )
    const loginForm = () => (
      <Togglable buttonLabel='login'>
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>

    )
    return (
    <div>
      <h1>Blogit</h1>
      <Notification />
      {this.state.user === null ?
        loginForm() : blogsList()}
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  notify,
  newBlog,
  blogInit
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
