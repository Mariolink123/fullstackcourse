import { useState, useEffect } from 'react'
import axios from 'axios'



const App = () => {


  const [countries, setCountries] = useState([])
  const [filterName, setNewFilter] = useState('')

  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <>
      find countries <input value={filterName} onChange={handleFilterChange} />
      <br></br>
      <CountryDisplay countriesToShow={countriesToShow}></CountryDisplay>

    </>
  )
}



const Country = ({ country }) => {
  const [isShown, setShowedCountry] = useState(false)

  if (isShown) {
    return (
      <>
      <button onClick={() => setShowedCountry(!isShown)}>show</button>
      <DetailedCountry country={country}></DetailedCountry>

      </>
    )
  }
  
  return (
    <> 
      {country.name.common} <button onClick={() => setShowedCountry(!isShown)}>show</button>
      <br></br>
    </>
  )
}



const CountryDisplay = ({ countriesToShow }) => {

  const countryList = (
    <>
      {countriesToShow.map(country =>
        <Country key={country.name.common} country={country} />
      )}
    
    </>
  )

  const tooMany = "Too many matches, specify another filter"

  const returnedCountries = countriesToShow.length
  
  if (returnedCountries > 10) {
    return tooMany
  } else if (returnedCountries > 1) {
    return countryList
  } else if (returnedCountries === 1) {
  
  return (<DetailedCountry country={countriesToShow[0]}></DetailedCountry>)
  }
} 

const DetailedCountry = ({ country }) => {

  const [weatherData, setWeatherData] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  console.log(lat)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  console.log((weatherData.main))
 

 
  /*const temprature = Object.values(weatherData.main)[0] - 273
  const wind = Object.values(weatherData.wind)[0]
  const iconCode = weatherData.weather.icon
  const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`*/


  const languageList = Object.values(country.languages).map(language =>
    <li key={language}>{language}</li>
    )

  const flagURL = country.flags.png

  return (
    <>
    <h1>{country.name.common}</h1>
    capital {country.capital}
    <br></br>
    area {country.area}
    <h3>langauges:</h3>
    <ul>
      {languageList}
    </ul>
    <img src={flagURL}></img>
    <br></br>
    <h2>Weather in {country.capital}</h2>
    <p>temprature temprature</p>
    <img></img>
    <p>wind wind m/s</p>

    </>

  )
}


export default App;
