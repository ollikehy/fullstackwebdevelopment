import loginService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case('LOGIN'):
    return action.user
  case('TOKEN'):
    return state.token
  case('INIT_USERS'):
    return action.data
  case('USER'):
    return state
  default:
    return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await loginService.getUsers()
    await dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const getUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'USER'
    })
  }
}

export const getToken = () => {
  return async (dispatch) => {
    dispatch({
      type: 'TOKEN'
    })
  }
}

export const login = (userN, pw) => {
  return async (dispatch) => {
    const user = await loginService.login({ username: userN, password: pw })
    await dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export default reducer