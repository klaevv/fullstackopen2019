import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/login'
import './index.css'
import Notification from './notification'
import Error from './error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (text) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showError = (text) => {
    setError(text)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showError(`invalid credentials for ${username}`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUsername('')
    setPassword('')
    setUser('')
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
          setBlogs(blogs.concat(blog))
          showNotification(
            `${title} by ${author} (${url}) added`
          )
          setTitle('')
          setAuthor('')
          setUrl('')
          setCreateBlogVisible(false)
        })
    } catch(error) {
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

  if (user) {
    return (
      <div>
        <Notification message={notification} />
        <h2>blogs</h2>
        <p>{`${user.name} logged in :)`}</p>
        <button type="button" onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        {blogForm()}
      </div>
    )
  }

  return (
    <div>
      <Error message={error} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default App
