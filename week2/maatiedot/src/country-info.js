import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Language from './language'

const CountryInfo = ({name, capital, population, languages, flag}) => {
  const [ weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`https://api.apixu.com/v1/current.json?key=2776bc6e854f4592a4f100105190604&q=${capital}`)
    .then(response => {
      setWeather(response.data)
    })
  }, [])

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(language =>
          <li key={language.name}>
            <Language
              name={language.name}
            />
          </li>
        )}
      </ul>
      <img
        alt="flag"
        src={flag}
        style={{height: 120}}
      />
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.current && weather.current.temp_c} celsius</p>
      <img
        alt="flag"
        src={weather.current && weather.current.condition.icon}
        style={{height: 120}}
      />
      <p>wind: {weather.current && weather.current.wind_kph} kph</p>
      <p>wind direction: {weather.current && weather.current.wind_dir}</p>
    </div>
  )
}

export default CountryInfo
