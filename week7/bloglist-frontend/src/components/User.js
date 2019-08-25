import React from 'react'
import PropTypes from 'prop-types'

const User = ({ name, blogsCreated }) => {
  return (
    <div>
      {name}, blogs: {blogsCreated}
    </div>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  blogsCreated: PropTypes.number.isRequired
}

export default User
