import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
    const blogs = props.blogs.sort((a, b) => a.likes - b.likes < 0)
    const signedUser = {username: props.user.username, token: props.userToken }
    console.log(signedUser)
    return (
        <div>
        <button onClick={props.handleLogOut}>logout</button>
        <h2>Tervetuloa sovellukseen {props.username}</h2>
        <h3>Luo uusi blogi</h3>
          <form onSubmit={props.addBlog}>
            <div>title<input
              value={props.newBlog}
              onChange={props.handleBlogChange}
            /></div>
            <div>author<input
              value={props.author}
              onChange={props.handleAuthorChange}
            /></div>
            <div>url<input
              value={props.url}
              onChange={props.handleUrlChange}
            /></div>
            <div><button type="submit">tallenna</button></div>
          </form>
        <h2>Blogit</h2>
        {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} signedUser={signedUser}/>
        )}
      </div>
    )
}

export default BlogList