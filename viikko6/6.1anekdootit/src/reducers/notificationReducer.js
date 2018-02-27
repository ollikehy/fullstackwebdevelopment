const errorAtStart = ''

const reducer = (state = errorAtStart, action) => {
    switch (action.type) {
        case 'DEFAULT':
            return state = errorAtStart
        case 'NOTIFY':
            return state = action.content
        default:
            return state
    }
}

export const notify = (content, time) => {
    console.log('notifying')
    return async (dispatch) => {
    dispatch({
        type: 'NOTIFY',
        content
    })
    setTimeout(() => dispatch({type: 'DEFAULT'}), time*1000)
    console.log('defaulting')
    }
}

export default reducer