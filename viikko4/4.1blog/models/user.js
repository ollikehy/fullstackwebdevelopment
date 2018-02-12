const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    adult: Boolean
})

userSchema.statics.formatUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User