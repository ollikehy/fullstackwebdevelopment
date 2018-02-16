import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      newBlog: '',
      url: '',
      author: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }  

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.author,
      title: this.state.newBlog,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
      })
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
      <div>
        <button onClick={this.handleLogOut}>logout</button>
        <h2>Tervetuloa sovellukseen {this.state.username}</h2>
        <h3>Luo uusi blogi</h3>
          <form onSubmit={this.addBlog}>
            <div>title<input
              value={this.state.newBlog}
              onChange={this.handleBlogChange}
            /></div>
            <div>author<input
              value={this.state.author}
              onChange={this.handleAuthorChange}
            /></div>
            <div>url<input
              value={this.state.url}
              onChange={this.handleUrlChange}
            /></div>
            <div><button type="submit">tallenna</button></div>
          </form>
        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    
    const loginForm = () => (
      <div>
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
          </div>
          <div>
            salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
    return (
    <div>
      {this.state.user === null ?
        loginForm() : blogsList()
      }
    </div>
  )
  }
}


export default App;
