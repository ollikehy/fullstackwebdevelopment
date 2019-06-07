const { ApolloServer, UserInputError, AuthenticationErrorm, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://ollikehy:salasana@ollikehyfullstack-s24m4.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('mongodb error ' + error)
  })

const authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!,
    born: Int,
    bookCount: Int
  }
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      const foundAuthors = await Author.find({})
      return foundAuthors
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const foundBooks = await Book.find({}).populate('author')
        return foundBooks
      }
      let returnedBooks = await Book.find({}).populate('author')
      if (args.genre) {
        returnedBooks = returnedBooks.filter(b => (b.genres.indexOf(args.genre) > -1))
      }
      if (args.author) {
        returnedBooks = returnedBooks.filter(b => b.author == args.author)
      }
      return returnedBooks
    },
  },
  Book: {
    author: async (root) => {
      if (!root.author) {
        return {name: 'John Doe'}
      }
      const returnedAuthor = await Author.findOne({ name: root.author.name })
      return returnedAuthor
    }
  },
  Author: {
    bookCount: async (root) => {
      const authorsBooks = await Book.find({ author: root.id })
      return authorsBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let bookAuthor = await Author.findOne({ name: args.author })

      if (!bookAuthor) {
        bookAuthor = new Author({ name: args.author })
        try {
          await bookAuthor.save()
          console.log('new author ' + bookAuthor.name + ' saved')
        } catch (error) {
          throw new UserInputError(error, {
            invalidArgs: args
          })
        }
      }
      console.log('creating new book')
      const book = new Book({ ...args, author: bookAuthor })

      try {
        await book.save()
        console.log('book saved')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error, {
          invalidArgs: args,
        })
      }
      
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  /*  context: async ({ req }) => {
      const authorization = req ? req.headers.authorization : null
  
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), JWT_KEY)
        
        const currentUser = await User
        .findById(decodedToken.id)
      }
    }*/
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
