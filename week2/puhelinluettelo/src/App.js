import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './person'
import SearchForm from './search-form'
import AddForm from './add-form'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

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
      <SearchForm newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Lisää uusi henkilö</h3>
      <AddForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      {list.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
