import React, { useState } from 'react'

const Person = (props) =>
  <p>{props.name} {props.number}</p>

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ filtered, setFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} on jo luettelossa`)
    }
    else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const results = persons.filter(person => person.name.includes(event.target.value))
    setFiltered(results)
    setNewSearch(event.target.value)
  }

  const list = newSearch ? filtered : persons

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form>
        <div>
          rajaa näytettäviä: <input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>
      <h3>Lisää uusi henkilö</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {list.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )

}

export default App
