import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'


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
    <Message>
      <div style={style}>
        {msg}
      </div>
    </Message>
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
