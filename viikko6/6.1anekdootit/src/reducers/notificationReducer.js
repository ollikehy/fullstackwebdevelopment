const errorAtStart = 'render error message here'

const reducer = (state = errorAtStart, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return null
        default:
            return state
    }
}

export default reducer