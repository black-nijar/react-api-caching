import './App.css';
import { useState } from 'react';
import { useFetch } from './utils/useFetch';

function Weather() {
  const apiKey = `b9a8f6b1fa43e1fe58c290d4b3a99415`;
  const cacheTime = 100000

  const [weatherInfo, setWeatherinfo] = useState({})
  
  const [data, error, loading] = useFetch()
  
async function fetchWeatherInfo(cityName) {
  let weatherInfo = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`
  )
    .then(data => data.json())
    .then(myJson => myJson)
  return weatherInfo
}
const cache = {}
let cacheTimer = 0

async function fetchWithCache(cityName, time) {
  const now = new Date().getTime()
  if (!cache[cityName] || cache[cityName].cacheTimer < now) {
    cache[cityName] = await fetchWeatherInfo(cityName)
    cache[cityName].cacheTimer = getCacheTimer(time)
  }
  return cache[cityName]
}
  function getCacheTimer(time) {
  const now = new Date().getTime()
  if (cacheTimer < now + time) {
    cacheTimer = now + time
  }
  return cacheTimer
  }
  

  const fetchWetherData = async (cityName) => {
    const weatherData = await fetchWithCache(cityName.toLowerCase(), cacheTime)
    console.log({ weatherData })
    setWeatherinfo(weatherData)
  }

  console.log('res', weatherInfo,'cache', cache)

  return (
    <div>
      
      <div>Weather Info</div>
      <input type={"text"} onChange={e => fetchWetherData(e.target.value)} />
      
    </div>
  );
}

export default Weather;
