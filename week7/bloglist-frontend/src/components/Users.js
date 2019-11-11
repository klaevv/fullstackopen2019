import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

function Users({ users, loggedUser, handleLogout }) {
  return (
    <div>
      <Header
        loggedUser={loggedUser}
        handleLogout={handleLogout}
      />
      <h2>Users</h2>
      {users.map(user =>
        <p key={user.id}>{user.name}</p>
      )}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loggedUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Users
