const supertest = require('supertest')
const {app, server} = require('../index.js')
const api = supertest(app)
const Blog = require('../models/blog')
const { formatBlog, initialBlogs, blogsInDb } = require('./test_helper')

console.log('blog_api_test starts')

describe.skip('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()
        
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.length).toBe(blogsInDatabase.length)
        })
})

describe.skip('addition of a new blog', async () => {
    beforeAll(async () => {
        await Blog.remove({})
    })

    test('a valid blog can be added', async () => {
        const blogsInDatabase = await blogsInDb()

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

            expect(response.body.length).toBe(blogsInDatabase.length +1)
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
})
describe.skip('deletion of a note', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: 'Blog',
            author: 'Author',
            url: 'url',
            likes: 0
        })
        await Blog.remove({})
        await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()
        const titles = blogsAfterOperation.map(b => b.title)

        expect(titles).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length -1)

    })
})
describe.skip('updating a note', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: 'Blog',
            author: 'Author',
            url: 'url',
            likes: 0
        })
        await Blog.remove({})
        await addedBlog.save()
    })
    test('PUT /api/blogs/:id succesfully updates blog', async () => {
        const updatedBlog = new Blog({
            title: 'Title',
            author: 'author',
            url: 'url',
            likes: 50
        })
        await api
            .put(`/api/blogs/${addedBlog._id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const response = await api
        .get('/api/blogs')
        
        const likes = response.body.map(r => r.likes)
        expect(likes).toContain(50)
    })
})
afterAll(() => {
    server.close()
})