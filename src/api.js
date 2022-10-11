import axios from "axios";

const APIKEY = 'df1ea473286fecbabf583b89384dd530'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

export const WeatherAPI = {
    getTodayWeather(lon, lat) {
        return instance.get(`weather?lang=ru&lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
        ).then(response => {
            // console.log(response)
            return response.data
        })
    },
    getFiveDaysAndThreeHoursWeather(lon, lat) {
        return instance.get(`forecast?lat=${lat}&lon=${lon}&lang=ru&appid=${APIKEY}&units=metric`
        ).then(response => {
            // console.log(response)
            return response.data
        })
    }
}
