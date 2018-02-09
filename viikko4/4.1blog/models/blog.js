const mongoose = require('mongoose')
const Schema = mongoose.Schema

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

mongoose.Promise = global.Promise

let blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.statics.formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog