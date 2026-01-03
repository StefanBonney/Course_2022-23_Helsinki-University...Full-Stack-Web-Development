import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weatherForecast, setWeatherForecast] = useState(null)

  // state update (effect) -> fetch weather data when country changes
  useEffect(() => {
    // set variables for API request
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const capital = country.capital[0]
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

    // fetch weather data from OpenWeatherMap API
    axios
      .get(apiUrl)
      .then(response => {
        setWeatherForecast(response.data)
      })
      .catch(error => {
        console.log('Weather fetch failed:', error)
      })
  }, [country]) // re-fetch

  return (
    <div>

      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="200" 
      />

        {/* Weather information - only show when data is loaded */}
      <h3>Weather in {country.capital}</h3>
      {weatherForecast && (
        <div>
          {/* Temperature */}
          <p>Temperature: {weatherForecast.main.temp} Celsius</p>
          {/* Weather icon */}
          <img 
            src={`https://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}@2x.png`}
          />
          {/* Wind speed */}
          <p>Wind: {weatherForecast.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Country