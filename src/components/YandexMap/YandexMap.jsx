import { useEffect, useState } from "react"
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps"
import s from './YandexMap.module.css'


function YandexMap({latitude, longitude, screenSize }) {
    const [mapWidth, setMapWidth] = useState (730)

    useEffect(() => {
        if (screenSize.dynamicWidth <= 1512) {
            setMapWidth(screenSize.dynamicWidth - 80 - 25)
        } else {setMapWidth(730)}
    }, [screenSize])

    return (
        <div className={s.YandexMap_wrapper}>
            <YMaps>
                <Map state={{
                    center: [latitude, longitude],
                    zoom: 12,
                }} width={mapWidth} height={395}>
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