import React from 'react'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import { voting, setDefault } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  voting = (anecdote) => {
    this.props.store.dispatch(anecdoteVote(anecdote.id))
    this.props.store.dispatch(voting(anecdote.content))
    setTimeout(() => this.props.store.dispatch(setDefault()), 4000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.voting(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
