var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes += blog.likes)
  return likes
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let i = 0
  blogs.map((blog, index) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      i = index
    }
  })
  return blogs[i]
}

const mostBlogs = (blogs) => {
  const partitionedByAuthor = _.values(_.groupBy(blogs, 'author'))
  const returnObject = {
    author: '',
    blogs: 0
  }
  let blogsByAuthorMax = 0
  partitionedByAuthor.map(blogs => {
    if (blogs.length > blogsByAuthorMax) {
      blogsByAuthorMax = blogs.length
      returnObject.author = blogs[0].author
      returnObject.blogs = blogsByAuthorMax
    }
  })
  return returnObject
}

const mostLikes = (blogs) => {
  const partitionedByAuthor = _.values(_.groupBy(blogs, 'author'))
  const returnObject = {
    author: '',
    likes: 0
  }
  let likesByAuthorMax = 0
  partitionedByAuthor.map((blogs, index) => {
    let temp = 0
    let author = blogs[index].author
    blogs.map(blog => temp += blog.likes)
    if (temp > likesByAuthorMax) {
      likesByAuthorMax = temp
      returnObject.author = author
      returnObject.likes = temp
    }
  })
  return returnObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
