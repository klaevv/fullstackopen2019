import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import './index.css'
import Notification from './notification'
import Error from './error'
import  { useField, useResource } from './hooks'


const App = () => {
  const blogService = useResource('/api/blogs')
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        const sorted = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sorted)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.addToken(user.token)
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
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      username.reset()
      password.reset()
      setUser(user)
    } catch(error) {
      showError(`invalid credentials for ${username.value}`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    username.reset()
    password.reset()
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
      showError(`creating ${title} failed`)
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
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlog={() => console.log('like')} // eslint-disable-line no-console
            removeBlog={() => console.log('remove')} // eslint-disable-line no-console
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
      <Error message={error} />
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

export default App
