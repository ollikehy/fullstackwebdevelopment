import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Container, Table, Grid, Image, Input, Button, Form} from 'semantic-ui-react'

const Menu = () => {
  const menuStyle = {
    fontSize: 18,
    backgroundColor: '#e6e6e6',
    fontColor: 'black',
    maxWidth: 300,
    border: 'solid',
    padding: 5,
    marginBottom: 10
    }
  return ( 
  <div style={menuStyle}>    
    <Link to="/">Anecdotes</Link>&nbsp;&nbsp;
    <Link to="/create">Create new</Link>&nbsp;&nbsp;
    <Link to="/about">About</Link>&nbsp;
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled>
    <Table.Body>
    <ul>
      {anecdotes.map(anecdote => <Table.Row><Table.Cell><li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li></Table.Cell></Table.Row>)}
    </ul>
    </Table.Body>
    </Table>  
  </div>
)

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>Votes: {anecdote.votes}</p>
      <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/250px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg'

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <Grid ui padded='false'>
    <Grid.Column width={6}>
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src={src} size='medium' />
      </Grid.Column>
      </Grid>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <em>Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
  
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.</em>
  </div>
)

const Notification = ({notification}) => {
  const notificationStyle = {
    color: 'green',
    marginTop: 10,
    padding: 5,
    maxWidth: 500,
    border: 10,
    borderStyle: 'ridge'
    }
  if (notification) {
  return(
  <div style={notificationStyle}>
    <h3>{notification}</h3>
  </div>
  ) } else {
    return null
  }
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.history.push('/')

    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field width={10}>
            <label>Content</label>
            <Input placeholder='Content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field width={10}>
            <label>author</label>
            <Input placeholder='Author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field width={10}>
            <label>url for more info</label>
            <Input placeholder='Info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button>Create</Button>
        </Form>
      </div>  
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      page: 'home'
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })

    this.setState({ notification: `a new anecdote ${anecdote.content} created!`})
    setTimeout(() => this.setState({notification: ''}), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
    <Container>
      <head>
        <link  rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      </head>
      <div>
        <Router>
          <div>
        <h1>Software anecdotes</h1>
          <Menu />
          <Notification notification={this.state.notification}/>
            <Route exact path="/" render={() => 
            <AnecdoteList anecdotes={this.state.anecdotes}/>}/>
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />}/>
            <Route path="/about" render={() => <About />}/>
            <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>}/>
          </div>
        </Router>
    </div>
    <div>
      <Footer />
    </div>
    </Container>
    );
  }
}

export default App;