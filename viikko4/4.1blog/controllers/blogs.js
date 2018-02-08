const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(Blog.formatBlog))
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog = Blog.formatBlog(blog)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }) 

module.exports = blogsRouter