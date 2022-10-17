import s from './TodayWeather.module.css'
import { useEffect, useState } from 'react'
import { WeatherAPI } from '../../api'
import { getWeatherIcon } from './../../weatherIcons.js'

function TodayWeather({ longitude, latitude }) {
    let [todayWeatherData, setTodayWeather] = useState(null)
    const [todayWeatherIcon, setTodayWeatherIcon] = useState(null)
    useEffect(() => {
        if (setTodayWeather) {
            WeatherAPI.getTodayWeather(longitude, latitude).then(
                (response) => {
                    setTodayWeather(response)
                    setTodayWeatherIcon(response.weather[0].icon)
                }
            )
        }

    }, [longitude, latitude])
    if (todayWeatherData) {
        return (
            <div className={s.todayWeather_wrapper}>
                <div className={s.todayWeather_header}>
                    <div className={s.todayWeather_city}>
                        {todayWeatherData.name}({todayWeatherData.sys.country})
                    </div>
                    <div className={s.todayWeather_time}>
                        <span>Сейчас 16:70</span>
                    </div>
                </div>
                <div className={s.todayWeather_middle}>
                    <div className={s.todayWeather_temperature}>
                        {Math.floor(todayWeatherData.main.temp)}°
                    </div>
                    <div className={s.todayWeather_svg}>
                        {todayWeatherIcon === null ? {} : getWeatherIcon(todayWeatherIcon)}
                    </div>
                    <div className={s.todayWeather_weather}>
                        {todayWeatherData.weather[0].description[0].toUpperCase() +
                            todayWeatherData.weather[0].description.slice(1)} <br />
                        Ощущается как {Math.floor(todayWeatherData.main.feels_like)}°
                    </div>
                </div>
                <div className={s.todayWeather_bottom}>
                    <div className={s.todayWeather_wind}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-wind" viewBox="0 -1 16 16">
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        {Math.floor(todayWeatherData.wind.speed)} м.с
                    </div>
                    <div className={s.todayWeather_humidity}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-droplet" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                            <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
                        </svg>
                        {Math.floor(todayWeatherData.main.humidity)}%
                    </div>
                    <div className={s.todayWeather_pressure}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
                            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                        </svg>
                        {Math.floor(todayWeatherData.main.pressure)} мм рт. ст.
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.todayWeather_wrapper}>
                <div className={s.todayWeather_header}>
                    <div className={s.todayWeather_city}>NoData</div>
                    <div className={s.todayWeather_time}>
                        <span>NoData</span>
                    </div>
                </div>
                <div className={s.todayWeather_middle}>
                    <div className={s.todayWeather_temperature}>NoData</div>
                    <div className={s.todayWeather_svg}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="150px" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
                            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z" />
                        </svg>
                    </div>
                    <div className={s.todayWeather_weather}>NoData</div>
                </div>
                <div className={s.todayWeather_bottom}>
                    <div className={s.todayWeather_wind}>NoData</div>
                    <div className={s.todayWeather_humidity}>NoData</div>
                    <div className={s.todayWeather_pressure}>NoData</div>
                </div>
            </div>
        )
    }

}

export default TodayWeather

