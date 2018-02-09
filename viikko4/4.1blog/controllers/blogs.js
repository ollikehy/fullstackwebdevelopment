const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.formatBlog))
})
  
blogsRouter.post('/', (request, response) => {
  try {
    const body = request.body 
    
    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'content missing'})
    }

    let setLikes = 0
    
    if (body.likes === undefined) {
      setLikes = 0
    } else {
      setLikes = body.likes
    }
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: setLikes
    })

    blog
      .save()
      .then(result => {
      response.status(201).json(result)
      })
    } catch (exception) {
      console.log(exception)
      response.status(500).json({error: 'something went wrong'})
  }

}) 

module.exports = blogsRouter