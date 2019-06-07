import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo-hooks'
import LoginForm from './LoginForm'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const LoginPage = (props) => {
  if (!props.show) {
    return null
  }
  const [token, setToken] = useState(null)

  const login = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    props.client.resetStore()
    document.location.reload()
  }

  if (!token && !localStorage.getItem('library-user-token')) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }
  return (
    <div>
      <button onClick={logout}>click here to logout</button>
    </div>
  )
}

export default LoginPage