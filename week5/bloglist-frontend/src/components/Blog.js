import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog }) => {
  const [fullInfoVisible, setfullInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (fullInfoVisible) {
    return (
      <div style={blogStyle}>
      <div onClick={() => setfullInfoVisible(!fullInfoVisible)}>
        {blog.title}, {blog.author}
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
          <button type="button" onClick={() => likeBlog(blog)}>
            like
          </button>
        </div>
        <div>
          added by: {user.username}
        </div>
      </div>
    </div>
    )
  }

  return (
    <div>
      <div style={blogStyle}>
        <div onClick={() => setfullInfoVisible(!fullInfoVisible)}>
          {blog.title}, {blog.author}
        </div>
      </div>
    </div>
  )
}

export default Blog
