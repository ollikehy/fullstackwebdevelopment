import React from 'react'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import { voting, setDefault } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  voting = (anecdote) => {
    this.props.anecdoteVote(anecdote.id)
    this.props.voting(anecdote.content)
    setTimeout(() => this.props.setDefault(), 4000)
  }

  render() {
    const {filter} = this.props
    let {anecdotes} = this.props
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
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

const mapDispatchToProps = {
  anecdoteVote,
  voting,
  setDefault
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
