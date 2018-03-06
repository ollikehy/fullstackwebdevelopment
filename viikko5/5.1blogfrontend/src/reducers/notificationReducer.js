
const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case('DEFAULT'):
            return state = initialState
        case('CHANGE'):
            return state = action.data
        default:
            return state
    }
}

export const notify = (data, time) => {
    return async (dispatch) => {
        console.log('notifying')
        dispatch({
            type: 'CHANGE',
            data
        })
        setTimeout(() => dispatch({ type: 'DEFAULT'}), time*1000)
        console.log('defaulting')
    }
}

export default reducer