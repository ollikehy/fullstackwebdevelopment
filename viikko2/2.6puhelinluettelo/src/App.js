import React from 'react';
import personService from './service/persons';
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',
      message: ''
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
       let notListed = true
       this.state.persons.forEach(person => {
         if (person.name === this.state.newName) {
             notListed = false
         }          
       });
    
       if (notListed) {
        const personObject = {
           name: this.state.newName,
           id: this.state.persons.length + 1,
           number: this.state.newNumber
       }

       personService
       .create(personObject)
       .then(newPerson => {
           this.setState({
               persons: this.state.persons.concat(newPerson),
               message: `${this.state.newName} lisätty onnistuneesti`
           })
           setTimeout(() => this.setState({message: ''}), 5000)
       })
     } else {
         if (window.confirm(`Haluatko päivittää numeron henkilölle ${this.state.newName}?`)) {
            const person = this.state.persons.find(p => p.name === this.state.newName)
            const changedPerson = {...person, number: this.state.newNumber}

            personService
            .update(changedPerson.id, changedPerson)
            .then(changedPerson => {
                const persons = this.state.persons.filter(p => p.id !== changedPerson.id)
                this.setState({
                    persons: persons.concat(changedPerson),
                    message: 'Numero päivitetty onnistuneesti'
                })
                setTimeout(() => this.setState({message: ''}), 5000)
            }).catch(error => {
                alert(`henkilö ${changedPerson.name} on jo valitettavasti poistettu`)
                const personsU = this.state.persons.filter(p => p.id !== person.id)
                this.setState({persons: personsU})
            })
         }
     }
     this.setState({
         newName: '',
         newNumber: ''
        })  
    }

    handleDelete = ({id, name}) => {
        if (window.confirm(`Haluatko varmasti poistaa ${name} listasta?`)) {
        console.log('deleted');
        personService
        .deleteOne(id)
        .then(response => {
            const personsU = this.state.persons.filter(p => p.id !== id)
            this.setState({persons : personsU,
                           message: `${name} poistettu onnistuneesti`})
            setTimeout(() => this.setState({message: ''}), 5000)               
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
                     .includes(this.state.search.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Error message={this.state.message}/>
        <Input text='rajaa näytettäviä' value={this.state.search} onChange={this.handleSearch}/>
        <h3>Lisää uusi!</h3>
        <form onSubmit={this.addPerson}>
          <Input text='nimi' value={this.state.newName} onChange={this.handleNameChange}/>
          <Input text='numero' value={this.state.newNumber} onChange={this.handleNumberChange}/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Numbers onClick={this.handleDelete} persons={filtered} haku={this.state.search}/>
      </div>
    )
  }
}

const Error = ({message}) => {
    if (message.length > 1) {
        return (
            <div set className="message">
            {message}
            </div>
        )
    } else {
        return null
    }
}

const Numbers = ({persons, haku, onClick}) => {
    return (
        <div>
        <h3>Numerot</h3>
            <table>
                <tbody>
                {persons.map(person=><Person onClick={onClick} 
                             key={person.id} id={person.id} name={person.name} 
                             number={person.number} haku={haku}/>)}
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