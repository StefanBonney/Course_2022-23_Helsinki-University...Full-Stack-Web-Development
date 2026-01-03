import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  // all countries fetched from API
  const [countries, setCountries] = useState([])
  // user's search input
  const [searchCountries, setSearchCountries] = useState('')

  // state update (effect) -> fetch all countries once when component mounts
  useEffect(() => {
    console.log('fetching countries...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('countries fetched:', response.data.length)
        setCountries(response.data)
      })
  }, []) // run only on mount

  // state update (event) -> update seach term when user writes
  const handleSearchChange = (event) => {
    setSearchCountries(event.target.value)
  }

  // state update (event) -> show full details for a specific country on button click
  const handleShowClick = (countryName) => {
    setSearchCountries(countryName)
  }

  // filter countries by name based on search term
  const filterCountries = (countries, searchTerm) => {
    // don't show anything if search is empty
    if (!searchTerm) {
      return []
    }
  
    const lowerSearchTerm = searchTerm.toLowerCase()
    // return countries with name includes the search term
    return countries.filter(country => {
      const countryName = country.name.common.toLowerCase()
      return countryName.includes(lowerSearchTerm)
   })
  }
  const countriesToShow = filterCountries(countries, searchCountries)



  return (
    <div>
      find countries <input value={searchCountries} onChange={handleSearchChange}/>
      <Countries countries={countriesToShow} handleShowClick={handleShowClick} />
    </div>
  )
}

export default App