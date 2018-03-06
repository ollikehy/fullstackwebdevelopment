import loginService from '../services/login'

const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case('LOGIN'):
            return action.user
        case('TOKEN'):
            return state.token
        case('USER'):
            return state
        case('RESET'):
            return state = initialState
        default:
            return state
    }
}

export const getToken = () => {
    return async (dispatch) => {
        dispatch({
            type: 'TOKEN'
        })
    }
}

export const getUser = () => {
    return async (dispatch) => {
        await dispatch({
            type: 'USER'
        })
    }
}

export const resetUser = () => {
    return async (dispatch) => {
        dispatch({
            type: 'RESET'
        })
    }
}

export const login = (userN, pw) => {
    return async (dispatch) => {
        const user = await loginService.login({username: userN, password: pw })
        await dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export default reducer