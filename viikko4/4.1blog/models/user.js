const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.statics.formatUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User