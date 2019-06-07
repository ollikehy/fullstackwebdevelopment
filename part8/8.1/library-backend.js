const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://ollikehy:salasana@ollikehyfullstack-s24m4.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('mongodb error ' + error)
  })

const JWT_SECRET = 'JWT_SECRET_KEY'

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: async (root) => {
      if (!root.author) {
        return { name: 'John Doe' }
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
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let bookAuthor = await Author.findOne({ name: args.author })

      if (!bookAuthor) {
        bookAuthor = new Author({ name: args.author })
        try {
          await bookAuthor.save()
        } catch (error) {
          throw new UserInputError(error, {
            invalidArgs: args
          })
        }
      }
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
