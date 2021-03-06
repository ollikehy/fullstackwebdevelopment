const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1})
    
    response.json(users.map(User.formatUser))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        
        const existingUser = await User.find({username: body.username})
        if (existingUser.length > 0) {
            return response.status(400).json({error: 'username must be unique'})
        } else if (body.password.length < 3) {
            return response.status(400).json({error: 'password needs to be atleast 3 symbols long'})
        } else if (body.username.length < 0) {
            return response.status(400).json({error: 'username must not be empty'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult === undefined ? true : body.adult
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'something went wrong'})
    }
})

module.exports = usersRouter