import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
    const palautteita = store.getState()

    const total = palautteita.good + palautteita.bad + palautteita.ok

    const resetStore = (event) => {
      store.dispatch({type: 'ZERO'})
    }

    if (total === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
    }

    return (
        <div>
          <h2>statistiikka</h2>
          <table>
            <tbody>
              <tr>
                <td>hyvä</td>
                <td>{palautteita.good}</td>
              </tr>
              <tr>
                <td>neutraali</td>
                <td>{palautteita.ok}</td>
              </tr>
              <tr>
                <td>huono</td>
                <td>{palautteita.bad}</td>
              </tr>
              <tr>
                <td>keskiarvo</td>
                <td>{(palautteita.good - palautteita.bad)/palautteita.total}</td>
              </tr>
              <tr>
                <td>positiivisia</td>
                <td>{(palautteita.good / palautteita.total) * 100}%</td>
              </tr>
            </tbody>
          </table>
          <button onClick={resetStore}>nollaa tilasto</button>
        </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
    console.log('good ' + store.getState().good)
    console.log('bad ' + store.getState().bad)
    console.log('ok ' + store.getState().ok)
    console.log(store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}
const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)