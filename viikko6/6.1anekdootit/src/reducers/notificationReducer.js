const errorAtStart = ''

const reducer = (state = errorAtStart, action) => {
    switch (action.type) {
        case 'VOTING':
            return state = 'you voted for "' + action.content + '"'
        case 'CREATING':
            return state = 'you created "' + action.content + '" anecdote'
        case 'DEFAULT':
            return state = errorAtStart
        default:
            return state
    }
}

export const voting = (content) => {
    console.log('voting')
    return {
        type: 'VOTING',
        content
    }
}

export const creating = (content) => {
    console.log('creating')
    return {
        type: 'CREATING',
        content
    }
}

export const setDefault = () => {
    console.log('defaulting')
    return {
        type: 'DEFAULT'
    }
}
export default reducer