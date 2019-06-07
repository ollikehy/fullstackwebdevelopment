import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginPage from './components/LoginPage'
import UserPage from './components/UserPage'

const App = (props) => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {localStorage.getItem('library-user-token') ? 
        <button onClick={() => setPage('add')}>add book</button>: null}
        {page === 'login' ? null: <button onClick={() => setPage('login')}>
          {localStorage.getItem('library-user-token') ? `logout` : `login`}</button>}
        {localStorage.getItem('library-user-token') ? 
        <button onClick={() => setPage('userpage')}>user page</button>: null}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginPage
        show={page === 'login'}
        client={props.client}
      />

      <UserPage
        show={page === 'userpage'}
      />
    </div>
  )
}

export default App
