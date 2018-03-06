import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Users from './components/Users'
import { initUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'

class App extends React.Component {

  componentDidMount () {
    this.props.initUsers()
  }

  handleLogOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  render() {
    return (
      <div>
        <Container>
          <Router>
            <div>
              <Menu compact>
                <Menu.Item link>
                  <Link to="/">Home</Link> &nbsp;
                </Menu.Item>
                <Menu.Item link>
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item button onClick={this.handleLogOut}>
                Logout
                </Menu.Item>
              </Menu>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/users" render={() => <Users />} />
            </div>
          </Router>
        </Container>
      </div>
    )
  }
}

export default connect(
  null, { initUsers }
)(App)