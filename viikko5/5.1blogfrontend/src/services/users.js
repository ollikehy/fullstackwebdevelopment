import axios from 'axios'

const loginUrl = '/api/login'
const userUrl = '/api/users'

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get(userUrl)
  return response.data
}

export default { login, getUsers }