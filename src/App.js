import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [ climate, setClimate ] = useState({});
  const [ temp, setTemp ] = useState(0);
  const [ isFh, setIsFh ] =useState(true);

  const success = pos => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=14f99a99520a820506d4320d919163b3`)
      .then(res => {
        setClimate(res.data)
        setTemp(res.data.main.temp - 273.15);
      })
    }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const convertFahrenheit = () => {
    if(isFh){
      setTemp((temp * 9/5) + 32);
      setIsFh(false);
    }else{
      setTemp((temp - 32) * 5/9);
      setIsFh(true);
    }
      
}

  return (
    <div className="App">
        <div className="card">
            <h1 className="title">Wheater App</h1>

            <div className='info'>
              <h2 className='location'>{climate.name}, {climate.sys?.country}</h2>
            </div>
            <div className="image">
              <div className="img">
              <h4>{climate.weather?.[0].description}</h4>
                <img src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`} alt="Imagen Clima" />
              </div>
              <div className='description'>
                  <ul>
                    <li><b>Humidity: </b>{climate.main?.humidity} %</li>
                    <li><b>Pressure:  </b>{climate.main?.pressure} hPa</li>
                    <li><b>Clouds: </b>{climate.clouds?.all} % </li>
                  </ul>
              </div>
            </div>
            <div className="convert">
            <h2>{temp.toFixed(2)} {isFh ? '°C' : '°F'}</h2>
            </div>
            <button onClick={convertFahrenheit}>
             { 
             isFh ? 'Convert to °F' : 'Convert to °C'
             } 
            </button>
        </div>
    </div>
  );
}

export default App;
