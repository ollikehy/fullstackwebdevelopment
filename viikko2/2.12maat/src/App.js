import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
  }
  componentWillMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
        this.setState({countries : response.data})
        console.log(response.data);;
    })
    }

    handleClick = ({name}) => {
        this.setState({search : name})
        console.log(name);
    }

    handleSearch = (event) => {
        this.setState({search: event.target.value})
    }

    render() {
        console.log('rendering');
        const filtered = this.state.countries.filter(country => country.name.includes(this.state.search))
        return(
            <div>
                find countries: <input value={this.state.search} onChange={this.handleSearch}/>
                <Countries onClick={this.handleClick} countries={filtered}/>
            </div>
        )
    }
}

const Countries = ({onClick, countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                <h3>Countries</h3>
                <p>Too many countries match search criteria, please narrow it down</p>
            </div>
        )
    } else if (countries.length === 1) {
        return (
        <SingleCountry country={countries[0]}/>
        )
    }
    return (
    <div>
        <h3>Countries</h3>
        <ul>
            {countries.map(country=><Country onClick={onClick} key={country.name} name={country.name}/>)}
        </ul>
    </div>
    )
}

const Country = ({onClick, name}) => {
        return (
            <div onClick={() => onClick({name})}>
                {name}
            </div>
        )
    }

const SingleCountry = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img width='200' height='100' src={country.flag} alt='flag'></img>
        </div>
    )
}

export default App