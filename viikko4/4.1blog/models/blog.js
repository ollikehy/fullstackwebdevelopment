const mongoose = require('mongoose')
const Schema = mongoose.Schema

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