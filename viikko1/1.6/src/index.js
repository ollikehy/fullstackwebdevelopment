import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    render() {
     return (
        <div>
            <h2>Anna palautetta</h2>
            <button onClick={() => this.setState({ hyva: this.state.hyva + 1})}>
                hyvä
            </button>
            <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1})}>
                neutraali
            </button>
            <button onClick={() => this.setState({ huono: this.state.huono + 1})}>
                huono
            </button>
            <Statistiikka hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
        </div>
     )}
}

    const Statistiikka = (props) => {
        return (
            <div>
                <h3>Statistiikka</h3>
                <p>Hyvä: {props.hyva}</p>
                <p>Neutraali: {props.neutraali}</p>
                <p>Huono: {props.huono}</p>
            </div>
        )
    }

ReactDOM.render(
    <App />,
    document.getElementById('root'));