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
                <Statistic teksti='Hyvä' statistiikka={hyva}/>
                <Statistic teksti='Neutraali' statistiikka={neutraali}/>
                <Statistic teksti='Huono' statistiikka={huono}/>
                <Statistic teksti='Keskiarvo' statistiikka={keskiarvo}/>
                <Statistic teksti='Positiivisia' statistiikka={positiivisia}/>
            </div>
        )
    }

    const Statistic = ({teksti, statistiikka}) => {
        if (!statistiikka) {
            return (
                <p>{teksti}: 0</p>
            )
        }
        if (teksti === 'Positiivisia') {
            return (
                <p>{teksti}: {statistiikka}%</p>
            )
        }
        return (
        <p>{teksti}: {statistiikka}</p>
        )
    }

ReactDOM.render(
    <App />,
    document.getElementById('root'));