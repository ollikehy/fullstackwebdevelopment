import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
         </div>
    )
}

const App = () => {
    const now = new Date()
    const a = 10
    const b = 20
    const nimi = 'Pekka'
    const ika = 10
    console.log('Hello from komponentti')
    return (
    <div>
        <Hello name="Arto" age={26 + 10}/>
        <Hello name={nimi} age={ika}/>
        <p>{a} plus {b} is {a+b}</p>
        <p>The time is {now.toString()}</p>
    </div>
)}

ReactDOM.render(<App />, document.getElementById('root'));