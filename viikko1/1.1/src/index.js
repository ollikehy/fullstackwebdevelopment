import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.nimi1} tehtavat={props.tehtavat1}/>
            <Osa nimi={props.nimi2} tehtavat={props.tehtavat2}/>
            <Osa nimi={props.nimi3} tehtavat={props.tehtavat3}/>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.tehtavat}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.tehtavat} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14
  
    return (
      <div>
        <Otsikko otsikko={kurssi}/> 
        <Sisalto nimi1={osa1} tehtavat1={tehtavia1} nimi2={osa2} tehtavat2={tehtavia2} nimi3={osa3} tehtavat3={tehtavia3}/>
        <Yhteensa tehtavat={tehtavia1 + tehtavia2 + tehtavia3}/>
      </div>
    )
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )