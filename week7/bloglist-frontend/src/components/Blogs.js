import React from 'react'
import PropTypes from 'prop-types'

function Blogs({ blogs }) {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <p key={blog.id}>{blog.title}</p>
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs
