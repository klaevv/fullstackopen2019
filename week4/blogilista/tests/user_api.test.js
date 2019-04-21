const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', name: 'Root', password: 'sekret' })
  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/users')
  expect(response.body.length).toBe(2)
  const usernames = response.body.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
})
