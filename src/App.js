import { useEffect, useState } from 'react';
import './App.css';
import cn from 'classnames'
import TodayWeather from './components/TodayWeather/TodayWeather';
import Weather from './components/Weather/Weather';
import YandexMap from './components/YandexMap/YandexMap';
import TwoDaysWeather from './components/TwoDaysWeather/TwoDaysWeather';
import s from './components/Weather/Weather.module.css'





function App() {

  let [longitude, setLongitude] = useState(0)
  let [latitude, setLatitude] = useState(0)

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
      <div className={s.weather_header}>
        <div className={s.buttons_wrapper}>
          <button className={cn(s.weatherNow__button, s.button)}>Сейчас</button>
          <button className={cn(s.weatherTwoDays__button, s.button)}>Ближайшие два дня</button>
          <button className={cn(s.weatherSevenDays__button, s.button)}>Следующие семь дней</button>
        </div>
        <div className={s.weather_header_city}>
          <span className={s.weather_header_city_title}>Ваш город:&nbsp;</span>
          <span className={s.weather_header_city_city}>Александровск</span>
        </div>
      </div>
      {/* <Weather /> */}
      <TwoDaysWeather longitude={longitude} latitude={latitude} />
      
      <div className="todayWeather">
        <TodayWeather latitude={latitude} longitude={longitude} />
        <YandexMap latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default App;
