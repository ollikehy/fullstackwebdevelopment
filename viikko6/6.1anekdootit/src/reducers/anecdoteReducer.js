const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.data.content, votes:0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }
  return store
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInit = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default reducer