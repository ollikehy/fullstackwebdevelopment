import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const render = () => {
    ReactDOM.render(
    <div>
    <Provider store={store}>
        <App />
    </Provider>
    </div>,
    document.getElementById('root'))
}

render()
store.subscribe(render)