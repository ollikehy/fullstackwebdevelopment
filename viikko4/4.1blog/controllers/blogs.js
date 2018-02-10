const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.formatBlog))
})
  
blogsRouter.post('/', async (request, response) => {
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

    const savedBlog = await blog.save()
    response.status(201).json(Blog.formatBlog(blog)).send()

  } catch (exception) {
      console.log(exception)
      response.status(500).json({error: 'something went wrong'})
  }

}) 

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }
})

module.exports = blogsRouter