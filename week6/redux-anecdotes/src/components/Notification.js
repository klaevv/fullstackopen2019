import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const msg = store.getState().messages.message
  if (msg === '') {
    return null
  }
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
