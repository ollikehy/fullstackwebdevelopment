import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      {
        name
      }
      genres
      published
    }
  }
`

const Books = (props) => {
  if (!props.show) {
    return null
  }

 const [genre, setGenre] = useState('')

  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }

  let renderedBooks = books.data.allBooks

  if (genre) {
    renderedBooks = renderedBooks.filter(b => b.genres.indexOf(genre) > -1)
  }

  const changeGenre = (e) => {
    e.preventDefault()
    setGenre(e.target.innerText)
  }

  const genres = []
  books.data.allBooks.forEach(b =>
    b.genres.forEach(g => genres.indexOf(g) > -1 ? null : genres.push(g))
  )

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {renderedBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres &&
        genres.map(g =>
          <button key={g} onClick={changeGenre}>{g}</button>
        )}
    </div>
  )
}

export default Books