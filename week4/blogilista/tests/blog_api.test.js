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

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Lorem ipsum',
    author: 'B. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Lorem ipsum.html',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r)
  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(contents[contents.length - 1].title).toContain(
    'Lorem ipsum'
  )
})

test('a blog gets default likes value ', async () => {
  const newBlog = {
    title: 'Lorem ipsum',
    author: 'B. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Lorem ipsum.html'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r)
  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(contents[contents.length - 1].likes).toEqual(0)
})

test('a blog without title is rejected ', async () => {
  const newBlog = {
    author: 'B. Martin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Lorem ipsum.html',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r)
  expect(response.body.length).toBe(initialBlogs.length)
})

test('a blog without url is rejected ', async () => {
  const newBlog = {
    title: 'Lorem ipsum',
    author: 'B. Martin',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r)
  expect(response.body.length).toBe(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
