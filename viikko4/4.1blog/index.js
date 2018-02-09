const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
const config = require('./utils/config')

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb://kayttaja:salasana@ds229418.mlab.com:29418/fullstack-blog'
mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}