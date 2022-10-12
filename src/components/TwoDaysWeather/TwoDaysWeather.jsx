import s from './TwoDaysWeather.module.css'
import { useEffect, useState, } from 'react'
import { WeatherAPI } from '../../api'
import TimeWeatherCard from './TimeWeatherCard/TimeWeatherCard'
import Carousel from '../Carousel/Carousel'


function TwoDaysWeather({ latitude, longitude }) {

    let [todayWeather, setTodayWeatherArray] = useState()
    let [tomorrowWeather, setTomorrowWeatherArray] = useState()

    useEffect(() => {
        let date = new Date()
        date.setHours(0, 0, 0)
        let timestampToday = Math.round(date.getTime() / 1000 + 86400)
        let timestampTomorrow = timestampToday + 86400 * 2
        WeatherAPI.getFiveDaysAndThreeHoursWeather(longitude, latitude).then(response => {
            console.log(response)
            let firstArray = []
            let secondArray = []
            response.list.map(elem => {
                if (timestampToday >= elem.dt) {
                    firstArray.push(elem)
                }

                if (timestampToday < elem.dt && elem.dt <= timestampTomorrow) {
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
            <Carousel>
                {todayWeather.map((elem) => {
                    return (
                        <div>
                            <TimeWeatherCard today={elem} />
                        </div>
                    )
                })}
                {tomorrowWeather.map((elem) => {
                    return (
                        <div>
                            <TimeWeatherCard today={elem} />
                        </div>
                    )
                })}
                


             </Carousel>
                : null}
            
        </div>
    )
}

export default TwoDaysWeather