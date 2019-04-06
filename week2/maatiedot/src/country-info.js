import React from 'react'
import Language from './language'

const CountryInfo = ({name, capital, population, languages, flag}) => {
  console.log('flag: ', flag)
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
      <img alt="flag" src={flag} />
    </div>
  )
}

export default CountryInfo
