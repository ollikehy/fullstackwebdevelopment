import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { creating, setDefault } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))
    this.props.store.dispatch(creating(content))
    setTimeout(() => this.props.store.dispatch(setDefault()), 4000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
