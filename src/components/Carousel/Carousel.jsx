import { useEffect, useState, Children, cloneElement } from 'react'
import s from './Carousel.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Carousel = ({ children, screenSize }) => {

    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const [pageWidth, setPageWidth] = useState(0)
    
    const elemensPerPage = Math.floor((screenSize.dynamicWidth - 80) / 208)

    const handleLeftArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + (208 * 3)
            return Math.min(newOffset, 0)
        })
    }
   
    const handleRightArrowClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - (208 * 3)
            const maxOffset = -(208 * (pages.length - elemensPerPage))
            return Math.max(newOffset, maxOffset)
        })
    }

    useEffect(() => {
        setPages(Children.map(children, (child) => {
            return cloneElement(child)
        })
        )
    }, [])
    
    useEffect(() => {
        setOffset(0)
    }, [screenSize.dynamicWidth])

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