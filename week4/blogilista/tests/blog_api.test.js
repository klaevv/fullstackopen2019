const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    id: '5a422aa71b54a6762349k234',
    title: 'Go To Statement Considered Bad',
    author: 'C. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Bad.html',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r)
  expect(contents[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
