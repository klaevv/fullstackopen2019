import React from 'react'

const Country = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <button type="button" onClick={props.onClick}>show</button>
    </div>
  )
}

export default Country
