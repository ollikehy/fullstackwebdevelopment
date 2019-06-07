import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const USER = gql`
{
  me
  {
    username
    favoriteGenre
  }
}`

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

const UserPage = (props) => {
  if (!props.show) {
    return null
  }

  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)

  if (user.loading || books.loading) {
    return (
      <div>loading...</div>
    )
  }

  const recommendations = books.data.allBooks.filter(b => b.genres.indexOf(user.data.me.favoriteGenre) > -1)
  return (
    <div>
      <h2>Hello {user.data.me.username}</h2>
      <h3>Favourite genre: {user.data.me.favoriteGenre}</h3>
      <p>Recommended reading:</p>
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
          {recommendations.map(r =>
            <tr key={r.title}>
              <td>{r.title}</td>
              <td>{r.author.name}</td>
              <td>{r.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserPage