const supertest = require('supertest')
const {app, server} = require('../index.js')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () =>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })


test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Test Wars',
        author: 'Test User',
        url: 'http://blog.test.com',
        likes: 3,
    }  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body.length).toBe(initialBlogs.length +1)
        expect(titles).toContain('Test Wars')
})

test('a blog with no likes set has likes set to 0', async () => {
    const newBlog = {
        title: 'Test Wars12',
        author: 'Test User',
        url: 'http://blog.test.com'
    }  

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api
        .get('/api/blogs')
    
    const blogLikes = response.body.map(r => r.likes)
    expect(blogLikes[response.body.length-1]).toEqual(0)
}) 

test('adding a blog with no title and url results to errorcode 400', async () => {
    const newBlog = {
        author: 'Test User',
        likes: 0
    }  

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    server.close()
})