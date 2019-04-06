import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './search-form'
import Country from './country'
import CountryInfo from './country-info'

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

  const showCountryInfo = (name) => {
    const results = countries.filter(country =>
      country.name.toUpperCase().includes(name.toUpperCase()))
    setFiltered(results)
    setNewSearch(name)
  }

  const list = newSearch ? filtered : countries

  return (
    <div>
      <h2>Find countries</h2>
      <SearchForm
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      {list.length === 1
        && <CountryInfo
              name={list[0].name}
              capital={list[0].capital}
              population={list[0].population}
              languages={list[0].languages}
              flag={list[0].flag}
            />
      }
      {list.length < 11 && list.length > 1
        && list.map(country =>
        <Country
          key={country.name}
          name={country.name}
          onClick={() => showCountryInfo(country.name)}
        />)
      }
      {list.length >= 11
        && "Too many search results"}
    </div>
  )
}

export default App
