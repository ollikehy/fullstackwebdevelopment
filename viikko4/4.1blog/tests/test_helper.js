const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

const formatBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(User.formatUser)
}
module.exports = {
    initialBlogs, formatBlog, blogsInDb, usersInDb
}