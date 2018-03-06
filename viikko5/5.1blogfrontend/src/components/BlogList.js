import React from 'react'
import Blog from './Blog'
import { Form, Button, Table } from 'semantic-ui-react'

const BlogList = (props) => {
  const blogs = props.blogs.sort((a, b) => a.likes - b.likes < 0)
  const signedUser = { username: props.user.username, token: props.userToken }
  return (
    <div>
      <Button color="instagram" onClick={props.handleLogOut}>logout</Button>
      <h2>Tervetuloa sovellukseen {props.username}</h2>
      <h3>Luo uusi blogi</h3>
      <Form onSubmit={props.addBlog}>
        <Form.Field width="10">
          <label>title</label>
          <input
            value={props.newBlog}
            onChange={props.handleBlogChange}
          /></Form.Field>
        <Form.Field width="10">
          <label>author</label>
          <input
            value={props.author}
            onChange={props.handleAuthorChange}
          /></Form.Field>
        <Form.Field width="10">
          <label>url</label>
          <input
            value={props.url}
            onChange={props.handleUrlChange}
          /></Form.Field>
        <div><Button type="submit" color="instagram">tallenna</Button></div>
      </Form>
      <h2>Blogit</h2>
      <Table>
        <Table.Body>
          {blogs.map(blog =>
            <Table.Row key={blog.id} width="11">
              <Blog key={blog.id} blog={blog} signedUser={signedUser}/>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default BlogList