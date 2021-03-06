const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
      
    response.json(blogs.map(Blog.formatBlog))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body 
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'content missing'})
    }

    const user = await User.findById(decodedToken.id)

    let setLikes = 0
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.formatBlog(savedBlog)).send()

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({error: exception.message})
    }
    console.log(exception)
    response.status(500).json({error: 'something went wrong'})
  }

}) 

blogsRouter.delete('/:id', async (request, response) => {
  try {    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    if (blog == null) {
      return response.status(404).json({error: 'no blog found with given id'})
    }

    if (blog.user) {
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({error: 'only the author is allowed to delete this blog'})
     }
    }
    
    await Blog.findByIdAndRemove(blogId)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'malformatted id'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    if (body === undefined) {
      return response.status(400).json({error: 'content missing'})
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    return response.status(200).json(Blog.formatBlog(updatedBlog)).send()
  
  } catch (exception) {
    console.log(exception)
    return response.status(400).send({error: 'something went wrong'})
  }
})

module.exports = blogsRouter