import React from 'react'
import PropTypes from 'prop-types'

const User = ({ name, blogsCreated, blogs }) => {
  if (blogs) {
    return (
      <div>
        <h2>{name}</h2>
        <h3>added blogs</h3>
        {blogs.map((blog) =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </div>
    )
  }
  return (
    <div>
      {name}, blogs: {blogsCreated}
    </div>
  )
}

User.defaultProps = {
  blogsCreated: null,
  blogs: null
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  blogsCreated: PropTypes.number,
  blogs: PropTypes.array
}

export default User
