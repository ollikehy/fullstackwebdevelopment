import React, { useState } from 'react'
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

const RECOMMENDED_BOOKS = gql`
  query findBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
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
  const [recommendations, setRecommendations] = useState(null)
  const user = useQuery(USER)

  if (user.loading) {
    return (
      <div>loading...</div>
    )
  }
  const getRecommendations = async () => {
    const recommendations = await props.client.query({
      query: RECOMMENDED_BOOKS,
      variables: { genre: user.data.me.favoriteGenre }
    })
    setRecommendations(recommendations.data.allBooks)
  }

  return (
    <div>
      <h2>Hello {user.data.me.username}</h2>
      <h3>Favourite genre: {user.data.me.favoriteGenre}</h3>
      {recommendations ? null : <button onClick={getRecommendations}> Click for recommendations</button>}
      {recommendations && <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
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
      </table>}
    </div>
  )
}

export default UserPage