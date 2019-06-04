import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks';
import Select from 'react-select'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`


const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const editBirthyear = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (authors.loading) {
    return <div>loading...</div>
  }

  const changeBirthyear = async (e) => {
    e.preventDefault()

    const targetName = name.value
    const bornInt = parseInt(born)
    await editBirthyear({ variables: { name: targetName, setBornTo: bornInt } })

    setName('')
    setBorn('')
  }

  const options = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
    })
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={changeBirthyear}>
        <Select
          value={name}
          onChange={name => setName(name)}
          options={options}
          />
        <div>birthyear:
          <input value={born} type='number' onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>Change birthyear</button>
      </form>
    </div>
  )
}

export default Authors