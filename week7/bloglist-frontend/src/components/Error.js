import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Error = (props) => {
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

Error.propTypes = {
  messages: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageState
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Error)

export default ConnectedNotification
