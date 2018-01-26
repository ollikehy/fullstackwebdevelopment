import React from 'react';
import personService from './service/persons';

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
    personService
     .getAll()
     .then(response => {
         this.setState({ persons : response})
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

       personService
       .create(personObject)
       .then(newPerson => {
           this.setState({
               persons: this.state.persons.concat(newPerson)
           })
       })
     }
     this.setState({
         newName: '',
         newNumber: ''
        })  
    }

    handleDelete = ({id, name}) => {
        if (window.confirm(`Do you really want to delete ${name}?`)) {
        console.log('deleted');
        personService
        .deleteOne(id)
        .then(response => {
            const personsU = this.state.persons.filter(p => p.id !== id)
            this.setState({persons : personsU})
        })
    }
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
    const filtered = this.state.persons
                     .filter(person => person.name.toLowerCase()
                     .includes(this.state.haku.toLowerCase()))
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
        <Numbers onClick={this.handleDelete} persons={filtered} haku={this.state.haku}/>
      </div>
    )
  }
}

const Numbers = ({persons, haku, onClick}) => {
    return (
        <div>
        <h3>Numerot</h3>
            <table>
                <tbody>
                {persons.map(person=><Person onClick={onClick} key={person.id} id={person.id} name={person.name} number={person.number} haku={haku}/>)}
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

const Person = ({onClick, id, name, number, haku}) => {
    return (
        <tr><td>{name}</td>
            <td>{number}</td>
            <td><button onClick={() => onClick({id, name})}>poista</button></td>    
        </tr>
    )
}

export default App