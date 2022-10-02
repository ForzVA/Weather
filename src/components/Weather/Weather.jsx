import s from './Weather.module.css'
import cn from 'classnames'
import WeatherCard from './WeatherCard/WeatherCard'

function Weather() {

    return (
        <div >
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


