import { useEffect, useState, Children, cloneElement } from 'react'
import s from './Carousel.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Carousel = ({ children }) => {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const handleLeftArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + (208 * 3)
            return Math.min(newOffset, 0)
        })
    }
    const handleRightArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - (208 * 3)
            console.log(pages.length)
            const maxOffset = -(208 * (pages.length - 7))
            console.log('текущее значение:' + newOffset)
            console.log('максимальное значение:' + maxOffset)
            console.log(Math.max(newOffset, maxOffset))
            return Math.max(newOffset, maxOffset)
        })
    }

    useEffect(() => {
        setPages(Children.map(children, (child) => {
            return cloneElement(child)
        })
        )
    }, [])

    return (
        <div className={s.main_container}>
            <FaChevronLeft className={s.arrow + ' ' + s.arrow_left} onClick={handleLeftArrowClick} />
            <div className={s.window}>

                <div className={s.all_elements_container}
                    style={{
                        transform: `translateX(${offset}px)`,
                    }}
                >
                    {children}
                </div>

            </div>
            <FaChevronRight className={s.arrow + ' ' + s.arrow_right} onClick={handleRightArrowClick} />
        </div>
    )
}


export default Carousel