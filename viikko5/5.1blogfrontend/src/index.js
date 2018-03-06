import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)    
)

const render = () => {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
}
render()
store.subscribe(render)