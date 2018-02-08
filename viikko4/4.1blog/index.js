const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://kayttaja:salasana@ds229418.mlab.com:29418/fullstack-blog'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
