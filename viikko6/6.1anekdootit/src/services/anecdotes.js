import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
     const response = await axios.post(url, { content })
     return response.data
}

const voteAnecdote = async (anecdote) => {
    const updatedAnecdote = { content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1}
    const response = await axios.put(`${url}/${anecdote.id}`, updatedAnecdote)

    return response.data
}

export default { getAll, createNew, voteAnecdote }