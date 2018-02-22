const filterAtStart = ''

const reducer = (store = filterAtStart, action) => {
    switch(action.type){
        case 'CHANGE':
            return store = action.filter
        default:
            return store
    }
}

export const changeFilter = (filter) => {
    return {
        type: 'CHANGE',
        filter
    }
}

export default reducer