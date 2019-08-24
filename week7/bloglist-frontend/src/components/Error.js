import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: '#FF0000'
  }
  const msg = props.messages.error
  if (msg === '') {
    return null
  }
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

Notification.propTypes = {
  messages: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification