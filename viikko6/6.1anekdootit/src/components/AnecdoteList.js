import React from 'react'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  voting = async (anecdote) => {
    await anecdoteService.voteAnecdote(anecdote)

    this.props.anecdoteVote(anecdote.id)
    this.props.notify(`you voted for "${anecdote.content}"`, 4)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  anecdoteVote,
  notify
}

const anecdotesToShow = (filter, anecdotes) => {
  anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.filter, state.anecdotes)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList