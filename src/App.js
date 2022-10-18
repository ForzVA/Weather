import { useEffect, useState } from 'react';
import './App.css';
import cn from 'classnames'
import TodayWeather from './components/TodayWeather/TodayWeather';
import Weather from './components/Weather/Weather';
import YandexMap from './components/YandexMap/YandexMap';
import TwoDaysWeather from './components/TwoDaysWeather/TwoDaysWeather';
import s from './components/Weather/Weather.module.css'
import { WeatherAPI } from './api';
import CitySelection from './components/CitySelection/CitySelection';

function App() {

  const [longitude, setLongitude] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [city, setCity] = useState(0)
  const [listOfCities, setListOfCities] = useState(null)
  const [isEditMode, setEditMode] = useState(false)
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
  }

  const handleChangeCity = (event) => {
    console.log(event.target.value)
    if (isEditMode) {
      setCity(event.target.value)
    }

  }

  const ChangeCityWithSelect = (event) => {
    let myCity = `${event.name}, ${event.country}${event.state ? `, ${event.state}` : ''}`
    setCity(myCity)
    setLongitude(event.lon)
    setLatitude(event.lat)
    deactivateEditMode()
  }
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])


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

  useEffect(
    () => {
      if (city) {
        WeatherAPI.getTodayWeatherCity(city)
          .then(response => {
            console.log(response)
            setListOfCities(response)
          })
      }

    }, [city]
  )

  return (
    <div className="App">
      <div className={s.weather_header}>
        <div className={s.buttons_wrapper}>
          <button className={cn(s.weatherNow__button, s.button)}>Заглушка</button>
          <button className={cn(s.weatherTwoDays__button, s.button)}>Заглушка побольше</button>
          <button className={cn(s.weatherSevenDays__button, s.button)}>Заглушка побольше</button>
        </div>
        <div className={s.weather_header_city}>
          <span className={s.weather_header_city_title}>Ваш город:&nbsp;</span>
          {isEditMode
            ? <div>
              <div className={s.weather_header_cityInput}>
                <input type='text'
                  placeholder="Введите город"
                  onChange={handleChangeCity}
                  className={s.weather_header_city__input}
                >
                </input>
              </div>
              <div className={s.weather_header_city__select}>
                <CitySelection city={city} listOfCities={listOfCities} ChangeCityWithSelect={ChangeCityWithSelect} />
              </div>
            </div>
            : <span className={s.weather_header_city_city} onClick={activateEditMode}>
              {city ? city : 'Не выбрано'}
            </span>
          }
        </div>
      </div>
      {/* <Weather /> */}
      <TwoDaysWeather longitude={longitude} latitude={latitude} screenSize={screenSize} />

      <div className="todayWeather">
        <TodayWeather latitude={latitude} longitude={longitude} city={city} />
        <YandexMap latitude={latitude} longitude={longitude} screenSize={screenSize} />
      </div>
    </div>
  );
}

export default App;
