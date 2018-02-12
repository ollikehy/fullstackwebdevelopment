const supertest = require('supertest')
const {app, server} = require('../index.js')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

describe('adding a new user works as intended', async () => {
    beforeAll(async () => {
        await User.remove({})

        const user = new User({
            username: 'kayttaja',
            password: 'salasana'
        })

        await user.save()
    })

    test('cannot add user with password under 3 symbols', async () => {
        const usersBO = await usersInDb()

        const newUser = {
            username: 'test',
            name: 'asd',
            password: '1'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAO = await usersInDb()

        expect(usersBO.length).toEqual(usersAO.length)
    })

    test('cannot add user without unique username', async () => {
        const usersBO = await usersInDb()
        const newUser = {
            username: 'kayttaja',
            password: 'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAO = await usersInDb()

        expect(usersBO.length).toEqual(usersAO.length)
    })

    test('if user is added without adult-status it is true', async () => {
        const newUser = {
            username: 'testia',
            name: 'asdasd',
            password: '1234567'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)

        const usersAO = await usersInDb()
        const added = usersAO[usersAO.length -1]
        expect(added.adult).toBeTruthy
    })
})

afterAll(() => {
    server.close()
})