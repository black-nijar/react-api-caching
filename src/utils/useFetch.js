import React, { useEffect, useState } from "react";
import axios from 'axios';

const cache = {}
export const useFetch = () => {
  
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const [cityName, setCityName] = useState('');

  
  const handleQuery = (query) => {
    setCityName(query.toLowerCase())
  };

  console.log({ cityName })

  
  useEffect(() => {
    const time = 30000
    const timer =  setTimeout(() => {
      // console.log('b4 ', cache)
      // for (let key in cache) {
      //   delete cache[key]
      // }
       caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
         }
         console.log('cleared browser cache')
        });
      console.log('cleared cache', cache)
      
    }, time);
    console.log({ cache })
    const apiKey = `b9a8f6b1fa43e1fe58c290d4b3a99415`;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`
    // const url = `https://hn.algolia.com/api/v1/search?query=${cityName}`
    if (!cityName) return;

    const fetchData = async () => {
      console.log('caching data', cache)
      
      if (cache[cityName]) {
        setStatus('caching');
        const data = cache[cityName];
        setData(data);
        setStatus('cached result');
      } else {
        const { data } = await axios.get(url);
        cache[cityName] = data
        setData(data);
        setStatus('fethched result')
      }
    };

    fetchData();
    return () => clearTimeout(timer)
  }, [cityName]);

    return {data,status, handleQuery };
};
