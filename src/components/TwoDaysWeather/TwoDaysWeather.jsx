import s from './TwoDaysWeather.module.css'
import { useEffect, useState, } from 'react'
import { WeatherAPI } from '../../api'
import TimeWeatherCard from './TimeWeatherCard/TimeWeatherCard'


function TwoDaysWeather({ latitude, longitude }) {

    let [todayWeather, setTodayWeatherArray] = useState()
    let [tomorrowWeather, setTomorrowWeatherArray] = useState()

    useEffect(() => {
        let date = new Date()
        date.setHours(0, 0, 0)
        let timestampToday = Math.round(date.getTime() / 1000 + 86400)
        let timestampTomorrow = timestampToday + 86400
        WeatherAPI.getFiveDaysAndThreeHoursWeather(longitude, latitude).then(response => {
            console.log(response)
            let firstArray = []
            let secondArray = []
            response.list.map(elem => {
                if (timestampToday >= elem.dt) {
                    firstArray.push(elem)
                }

                if (timestampToday > elem.dt || elem.dt < timestampTomorrow) {
                    secondArray.push(elem)
                }
            })
            setTodayWeatherArray(firstArray)
            setTomorrowWeatherArray(secondArray)
        })

    }, [latitude, longitude]
    )

    return (
        <div className={s.cards}>
            {console.log(todayWeather)}
            {todayWeather ?
                todayWeather.map((elem) => {
                    return (
                        <div>
                            <TimeWeatherCard today={elem} />
                        </div>
                    )
                })
                : null}
            {/* {tomorrowWeather ?
                tomorrowWeather.map((elem) => {
                    return (
                        <div>
                            <TimeWeatherCard today={elem} />
                        </div>
                    )
                })
                : null} */}
        </div>
    )
}

export default TwoDaysWeather