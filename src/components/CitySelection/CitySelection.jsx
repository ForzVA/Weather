import s from './CitySelection.module.css'

const CitySelection = ({listOfCities, ChangeCityWithSelect, city}) => {
    console.log(listOfCities)
    return (
        <div className={s.citySelection}>
            {}
            {listOfCities && city 
            ? listOfCities.map((city, index) => {
                return (<div className={s.city_card}>
                    <span key={index} onClick={() => { ChangeCityWithSelect(city)}}>
                        {`${city.name}, ${city.country}${city.state ? `, ${city.state}` : ''}`}
                    </span>
                </div>)
            })
            : null}
        </div>
    )
}

export default CitySelection