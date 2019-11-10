import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (user) {
    return (
      <div style={blogStyle} className="blog">
        <div>
          {blog.title}, {blog.author}
          <div>
            {blog.url}
          </div>
          <div>
            likes: {blog.likes}
            <button type="button" onClick={() => likeBlog(blog)} alt="like">
              like
            </button>
          </div>
          <div>
            added by: {user.username}
          </div>
          <div>
            {user && (
              <button type="button" onClick={() => removeBlog(blog, user)}>
                remove
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={blogStyle}
      alt="smallBox"
      className="openInfo"
    >
      {blog.title}, {blog.author}
    </div>
  )
}

Blog.defaultProps = {
  user: null
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
