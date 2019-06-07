import React from 'react'
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
      published
    }
  }
`

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return (
      <div>loading...</div>
    )
  }

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
          {books.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books