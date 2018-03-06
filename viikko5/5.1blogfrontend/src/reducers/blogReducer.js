import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    if (action.type === 'NEW_BLOG') {
        return [...state, action.data]
    } 
    if (action.type === 'INIT_BLOGS') {
        return action.data
    } 
    if (action.type === 'LIKE') {
        const old = state.filter(b => b.id !== action.id)
        const liked = state.find(b => b.id === action.id)

        return [...old, {...liked, likes: liked.likes + 1}]
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
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const newBlog = (data) => {
    return async (dispatch) => {
        await blogService.create(data)
        dispatch({
            type: 'NEW_BLOG',
            data
        })
    }
}

export default blogReducer