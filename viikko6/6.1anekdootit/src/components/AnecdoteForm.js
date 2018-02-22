import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log('ebin')
    this.props.store.dispatch(anecdoteCreation(content))
    e.target.anecdote.value = ''
  }

  render() {
    console.log(this.props.store)
    console.log(anecdoteCreation)
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