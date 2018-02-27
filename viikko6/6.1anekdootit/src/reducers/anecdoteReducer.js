import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.data, votes:0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }
  return store
}

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    await anecdoteService.createNew(data)
    dispatch({
     type: 'CREATE',
     data
    })
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
     type: 'INIT',
     data: anecdotes
    })
  }
}

export default reducer