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

    kasvataArvoa = (arvo) => () => { 
        if (arvo === 'hyva') 
        {this.setState({hyva: this.state.hyva + 1})}
        else if (arvo ==='neutraali') 
        {this.setState({neutraali: this.state.neutraali +1})}
        else if (arvo ==='huono')
        {this.setState({huono: this.state.huono +1})}
        }

    render() {
     return (
        <div>
            <h2>Anna palautetta</h2>
            <Button handleClick={this.kasvataArvoa('hyva')}
                    text="Hyvä"/>
            <Button handleClick={this.kasvataArvoa('neutraali')}
                    text="Neutraali"/>
            <Button handleClick={this.kasvataArvoa('huono')}
                    text="Huono"/>
            <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
        </div>
     )}
    }

    const Button = ({handleClick, text}) => {
        return (    
            <button onClick={handleClick}>
                {text}
            </button>
        )
    }

    const Statistics = ({hyva, neutraali, huono}) => {
        var yhteensa = hyva + neutraali + huono
        var keskiarvo =  (hyva - huono) / yhteensa
        var positiivisia = (hyva / yhteensa) * 100
        if (!yhteensa) {
            return(
                <div>
                    <h3>Statistiikka</h3>
                    <p>Ei yhtään palautetta annettu</p>
                </div>
            )
        }
        return (
            <div>
                <h3>Statistiikka</h3>
                <table>
                    <Statistic teksti='Hyvä' statistiikka={hyva}/>
                    <Statistic teksti='Neutraali' statistiikka={neutraali}/>
                    <Statistic teksti='Huono' statistiikka={huono}/>
                    <Statistic teksti='Keskiarvo' statistiikka={keskiarvo}/>
                    <Statistic teksti='Positiivisia' statistiikka={positiivisia}/>
                </table>
            </div>
        )
    }

    const Statistic = ({teksti, statistiikka}) => {
        if (!statistiikka) {
            return (
                <tr>
                    <td>{teksti}</td><td> 0</td>
                </tr>
            )
        }
        if (teksti === 'Positiivisia') {
            return (
                <tr>
                    <td>{teksti}</td> <td>{statistiikka}%</td>
                </tr>
            )
        }
        return (
        <tr>
            <td>{teksti}</td> <td>{statistiikka}</td>
        </tr>
        )
    }

ReactDOM.render(
    <App />,
    document.getElementById('root'));