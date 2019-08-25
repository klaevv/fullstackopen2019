import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/login'
import  { useField } from './hooks'
import { setNotification, setError } from './reducers/messageReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import Notification from './components/Notification'
import Error from './components/Error'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      props.setBlogs(sorted)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      username.reset()
      password.reset()
      props.setUser(user)
    } catch(error) {
      props.setError(`invalid credentials for ${username.value}`, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    username.reset()
    password.reset()
    props.setUser(null)
  }

  const createBlog = (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url
      }
      blogService
        .create(newBlog)
        .then(blog => {
          props.setBlogs(props.blogs.concat(blog))
          props.setNotification(`${title} by ${author} (${url}) added`, 5)
          setTitle('')
          setAuthor('')
          setUrl('')
          setCreateBlogVisible(false)
        })
    } catch(error) {
      props.setError(`creating ${title} failed`, 5)
    }
  }

  const likeBlog = (blog) => {
    try {
      const newBlog = {
        user: props.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      blogService
        .update(blog.id, newBlog)
        .then(blog => {
          const updated = props.blogs.filter(b => b.id !== blog.id)
          props.setBlogs(
            updated.concat(blog)
          )
          props.setNotification(`${blog.title} by ${blog.author} liked`, 5)
        })
    } catch(error) {
      props.setError(`liking ${title} failed`, 5)
    }
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Poistetaanko ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          props.setBlogs(props.blogs.filter(b => b.id !== blog.id))
          props.setNotification(`${blog.title} removed successfully!`, 5)
        })
        .catch(() => {
          props.setError(`${blog.title} was removed from server :(`, 5)
        })
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <h2>Create new</h2>
          <form onSubmit={createBlog}>
            <div>
              title
              <input
                type="title"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                type="author"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
                type="url"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    )
  }
  if (props.user) {
    return (
      <div>
        <Notification />
        <Error />
        <h2>blogs</h2>
        <p>{`${props.user.name} logged in :)`}</p>
        <button type="button" onClick={handleLogout}>logout</button>
        {props.blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        )}
        {blogForm()}
      </div>
    )
  }
  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset
  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset
  return (
    <div>
      <Notification />
      <Error />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...usernameProps} />
        </div>
        <div>
          password
          <input {...passwordProps} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

App.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  setNotification: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

App.defaultProps = {
  user: null
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogState.blogs,
    user: state.userState.user
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  {
    setNotification,
    setError,
    setBlogs,
    setUser
  }
)(App)

export default ConnectedApp
