import React, { useState, useEffect } from 'react'
import Person from './person'
import SearchForm from './search-form'
import AddForm from './add-form'
import personsService from './services/persons'
import Notification from './notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko numero?`)) {
        const filteredList = persons.filter(person => person.name === newName)
        const duplicate = filteredList[0]
        personsService
          .update(duplicate.id, person)
          .then((response) => {
            console.log(response)
            const newList = persons.filter(person => person.id !== duplicate.id)
            setPersons(newList.concat({ ...person, id: response.data.id }))
            setNewName('')
            setNewNumber('')
            showNotification(`Henkilön ${person.name} numero on vaihdettu onnistuneesti!`)
          })
      }
    }
    else {
      personsService
        .create(person)
        .then(response => {
          console.log(response)
          setPersons(persons.concat({ ...person, id: response.data.id }))
          setNewName('')
          setNewNumber('')
          showNotification(`${person.name} on lisätty onnistuneesti!`)
        })
    }
  }

  const showNotification = (text) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Poistetaanko ${name} luettelosta?`)) {
      personsService
        .remove(id)
        .then((response) => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`${name} on poistettu onnistuneesti!`)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const results = persons.filter(person =>
      person.name.toUpperCase().includes(event.target.value.toUpperCase()))
    setFiltered(results)
    setNewSearch(event.target.value)
  }

  const list = newSearch ? filtered : persons

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={notification} />
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
      {list.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => removePerson(person.id, person.name)}
        />)}
    </div>
  )
}

export default App
