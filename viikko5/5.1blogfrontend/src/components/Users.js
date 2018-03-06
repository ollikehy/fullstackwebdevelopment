import React from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'

class Users extends React.Component {

  render() {
    return (
      <div>
        <head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </head>
        <Container>
          <h2>Blog app</h2>
          <h3>Käyttäjät</h3>
          <Table striped celled width="10">
            <Table.Body>
              {this.props.allUsers.map(user =>
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <p>{user.username}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>Blogs: {user.blogs.length}</p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const allUsers = state.users
  return {
    allUsers
  }
}

export default connect(mapStateToProps, null)(Users)