import React, { useState } from 'react'
import { useFetch } from './utils/useFetch'


const App = () => {
  const [name, setName] = useState('');
   const apiKey = `b9a8f6b1fa43e1fe58c290d4b3a99415`;

  // const url = name && `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${apiKey}`;
  const {data,status, handleQuery} = useFetch();

  console.log({ data }, 'status', status)

  return (
    <div>
      <div>Weather</div>
      <input type={"text"} onChange={e => setName(e.target.value)} value={name} />
      <button onClick={() => handleQuery(name)}>Search</button>
    </div>
  )
}

export default App
