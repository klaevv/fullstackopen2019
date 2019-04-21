const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password should be 3 characters long' })
    }
    if (!body.username || !body.password) {
      return response.status(400).json({ error: 'content missing' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
