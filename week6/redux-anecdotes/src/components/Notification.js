import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const msg = props.messages.message
  if (msg === '') {
    return null
  }
  return (
    <div style={style}>
      {msg}
    </div>
  )
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
