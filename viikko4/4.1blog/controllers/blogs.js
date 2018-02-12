const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
      
    response.json(blogs.map(Blog.formatBlog))
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body 
    
    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'content missing'})
    }

    const allUsers = await User.find({})
    const user = allUsers[0]

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
      likes: setLikes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.formatBlog(savedBlog)).send()

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