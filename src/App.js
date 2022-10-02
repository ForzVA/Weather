import { useEffect, useState } from 'react';
import './App.css';
import TodayWeather from './components/TodayWeather/TodayWeather';
import Weather from './components/Weather/Weather';
import YandexMap from './components/YandexMap/YandexMap';

function App() {

  let [longitude, setLongitude] = useState(0)
  let [latitude, setLatitude]  = useState(0)

  useEffect(
    () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          function showPosition(position) {
            setLongitude(position.coords.longitude)
            setLatitude(position.coords.latitude)
          }
        )
      }
    }, [longitude, latitude]
  )

  return (
    <div className="App">
      <Weather/>
      <div className="todayWeather">
      <TodayWeather latitude={latitude} longitude={longitude}  />
      <YandexMap latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default App;
