const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
const config = require('./utils/config')
const bodyParser = require('body-parser')

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

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