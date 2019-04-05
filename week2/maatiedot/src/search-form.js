import React from 'react'

const SearchForm = (props) => {
  return (
    <form>
        <div>
          find countries:
            <input
              value={props.newSearch}
              onChange={props.handleSearchChange}
            />
        </div>
      </form>
  )
}

export default SearchForm
