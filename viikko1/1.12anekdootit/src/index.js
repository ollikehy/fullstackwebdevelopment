import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0,0,0,0,0,0,0,0,0,0]
        }
    }

    pickRandom = () => () => {
        this.setState({selected : Math.floor((Math.random() * anecdotes.length))})
    }
    
    incrementVotes = () => () => {
        var voteCount = this.state.votes[this.state.selected]
        if (!voteCount) {
            voteCount = 0
        }
        voteCount = voteCount + 1
        this.state.votes[this.state.selected] = voteCount
        this.setState({votes: this.state.votes})
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>This anecdote has {this.state.votes[this.state.selected]} votes </p>
                <button onClick={this.pickRandom()}>
                 next anecdote
                </button>
                <button onClick={this.incrementVotes()}>
                 vote
                </button>
            </div>
        )}
    }

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
  

ReactDOM.render(<App anecdotes={anecdotes}/>,
     document.getElementById('root'));