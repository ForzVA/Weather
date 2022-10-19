import { useEffect, useState } from "react"
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps"
import s from './YandexMap.module.css'


function YandexMap({latitude, longitude, screenSize }) {
    const [mapWidth, setMapWidth] = useState(730)
    const [mapHeight, setMapHeight] =useState(395)

    useEffect(() => {
        if(screenSize.dynamicWidth <= 425) {
            setMapWidth(screenSize.dynamicWidth - 25 - 25)
            setMapHeight(290)
        } else if (screenSize.dynamicWidth <= 1512) {
            setMapWidth(screenSize.dynamicWidth - 25 - 25)
        } else {setMapWidth(730)}
    }, [screenSize])

    return (
        <div className={s.YandexMap_wrapper}>
            <YMaps>
                <Map state={{
                    center: [latitude, longitude],
                    zoom: 12,
                }} width={mapWidth} height={mapHeight}>
                    <ZoomControl options={{
                        size: 'large',
                        position: {
                            top:20,
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