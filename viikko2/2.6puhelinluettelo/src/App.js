import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      haku: ''
    }
  }

  componentWillMount() {
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
          this.setState({persons : response.data})
      })
  }

  addPerson = (event) => {
      event.preventDefault()
      let flag = true
      this.state.persons.forEach(person => {
        if (person.name === this.state.newName) {
            flag = false
        }          
      });
    
      if (flag) {
       const personObject = {
          name: this.state.newName,
          id: this.state.persons.length + 1,
          number: this.state.newNumber
      }

        const persons = this.state.persons.concat(personObject)
        this.setState({
            persons: persons
        })
    }
    this.setState({
        newName: '',
        newNumber: ''
    })  
    
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})
    }


    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    handleSearch = (event) => {
        this.setState({haku: event.target.value})
    }

  render() {
    const filtered = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.haku.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Input text='rajaa näytettäviä' value={this.state.haku} onChange={this.handleSearch}/>
        <h3>Lisää uusi!</h3>
        <form onSubmit={this.addPerson}>
          <Input text='nimi' value={this.state.newName} onChange={this.handleNameChange}/>
          <Input text='numero' value={this.state.newNumber} onChange={this.handleNumberChange}/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Numbers persons={filtered} haku={this.state.haku}/>
      </div>
    )
  }
}

const Numbers = ({persons, haku}) => {
    return (
        <div>
        <h3>Numerot</h3>
            <table>
                <tbody>
                {persons.map(person=><Person key={person.id} name={person.name} number={person.number} haku={haku}/>)}
                </tbody>
            </table>
        </div>
    )
}

const Input = ({text, value, onChange}) => {
    return (
        <div>
            {text}: <input value={value} onChange={onChange}/>
        </div>
        )
}

const Person = ({name, number, haku}) => {
    return (
        <tr><td>{name}</td><td>{number}</td></tr>
    )
}

export default App