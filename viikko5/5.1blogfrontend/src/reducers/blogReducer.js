import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  if (action.type === 'NEW_BLOG') {
    return [...state, action.data]
  }
  if (action.type === 'INIT_BLOGS') {
    return state = action.data
  }
  if (action.type === 'LIKE') {
    const old = state.filter(b => b.id !== action.id)
    const liked = state.find(b => b.id === action.id)
    return [...old, { ...liked, likes: liked.likes + 1 }]
  }
  return state
}

export const blogLike = (id) => {
  return {
    type: 'LIKE',
    id
  }
}

export const getBlogs = () => {
  return {
    type: 'GET_BLOGS'
  }
}

export const blogInit = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const newBlog = (blog) => {
  console.log('adding')
  return async (dispatch) => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data
    })
  }
}

export default blogReducer