import React from 'react'

const Person = ({ name, number, onClick }) => {
  return (
    <div>
      <p>{name} {number}</p>
      <button alt="remove" onClick={onClick}>poista</button>
    </div>
  )
}

export default Person
