import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, like }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={like}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog: PropTypes.object,
  like: PropTypes.func
}

export default SimpleBlog