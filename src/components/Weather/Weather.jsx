import s from './Weather.module.css'
import WeatherCard from './WeatherCard/WeatherCard'

function Weather() {

    return (
        <div >
            <div className={s.cardsWrapper}>
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
            </div>
        </div>
    )
}

export default Weather


