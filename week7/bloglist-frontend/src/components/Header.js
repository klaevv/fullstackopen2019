import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({ loggedUser, handleLogout }) {

  return (
    <div>
      <Link to="/blogs">
        <p>blogs</p>
      </Link>
      <Link to="/users">
        <p>users</p>
      </Link>
      <p>{`${loggedUser.name} logged in :)`}</p>
      <button type="button" onClick={handleLogout}>logout</button>
    </div>
  )
}

Header.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Header
