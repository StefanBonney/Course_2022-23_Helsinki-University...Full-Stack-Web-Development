import Country from './Country'

const Countries = ({ countries, handleShowClick }) => {
  // >10 matches: show message to refine search
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  // 2-10 matches: show list of country names
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShowClick(country.name.common)}>Show</button>
          </div>
        ))}
      </div>
    )
  }
  
  // 1 match: show country details
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  // No matches or empty search: Show nothing
  return null
}

export default Countries