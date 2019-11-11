import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

function Blogs({ blogs, loggedUser, handleLogout }) {
  return (
    <div>
      <Header
        loggedUser={loggedUser}
        handleLogout={handleLogout}
      />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <p key={blog.id}>{blog.title}</p>
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Blogs
