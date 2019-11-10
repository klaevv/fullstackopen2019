import React from 'react'
import PropTypes from 'prop-types'

function Users({ users }) {
  return (
    <div>
      <h2>Users</h2>
      {users.map(user =>
        <p key={user.id}>{user.name}</p>
      )}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
