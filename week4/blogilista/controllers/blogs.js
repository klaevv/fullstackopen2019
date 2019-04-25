const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url || !request.token) {
    response.status(400).json({ error: 'Bad request' })
  } else {
    try {
      const blog = new Blog(request.body)
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      blog.user = user.id
      if (!blog.url || !blog.title ) {
        return response.status(400).send({ error: 'title or url missing'}).end()
      }
      if ( !blog.likes ) {
        blog.likes = 0
      }
      const result = await blog.save()
      user.blogs = user.blogs.concat(blog)
      await user.save()
      response.status(201).json(result)
    } catch(exception) {
      next(exception)
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token) {
      response.status(400).json({ error: 'token missing' })
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(blog.userId)
    if (decodedToken.username !== user.username) {
      return response.status(401).json({ error: 'forbidden' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
