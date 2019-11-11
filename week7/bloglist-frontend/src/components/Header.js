import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function Header({ loggedUser, handleLogout }) {

  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">home</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/blogs">blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">users</Link>
      </Menu.Item>
      <Menu.Item>
        <p>{`${loggedUser.name} logged in :)`}</p>
      </Menu.Item>
      <Menu.Item>
        <button type="button" onClick={handleLogout}>logout</button>
      </Menu.Item>
    </Menu>
  )
}

Header.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Header
