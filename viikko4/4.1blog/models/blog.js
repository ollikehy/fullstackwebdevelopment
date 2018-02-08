const mongoose = require('mongoose')
const Schema = mongoose.Schema

const url = 'mongodb://kayttaja:salasana@ds229418.mlab.com:29418/fullstack-blog'

mongoose.connect(url)

mongoose.Promise = global.Promise

let blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.statics.formatBlog = function(blog) {
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