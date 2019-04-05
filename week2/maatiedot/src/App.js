import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './country'
import SearchForm from './search-form'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    const results = countries.filter(country =>
      country.name.toUpperCase().includes(event.target.value.toUpperCase()))
    setFiltered(results)
    setNewSearch(event.target.value)
  }

  const list = newSearch ? filtered : countries

  return (
    <div>
      <h2>Find countries</h2>
      <SearchForm
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      {list.length < 11
        && list.map(country =>
        <Country
          key={country.name}
          name={country.name}
          number={country.number}
        />)
      }
      {list.length >= 11
        && "Too many search results"}
    </div>
  )
}

export default App
