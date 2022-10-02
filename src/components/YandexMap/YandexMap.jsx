import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps"
import s from './YandexMap.module.css'


function YandexMap({latitude, longitude }) {
    return (
        <div className={s.YandexMap_wrapper}>
            <YMaps>
                <Map state={{
                    center: [latitude, longitude],
                    zoom: 10,
                }} width={730} height={395}>
                    <ZoomControl options={{
                        size: 'large',
                        position: {
                            top: 90,
                            left: 20
                        }
                    }} />
                    <Placemark geometry={[latitude, longitude]}
                        options={{
                            iconColor: 'blue',
                            preset: 'islands#bluePersonIcon'
                        }} />
                </Map>
            </YMaps>
        </div>
    )
}

export default YandexMap