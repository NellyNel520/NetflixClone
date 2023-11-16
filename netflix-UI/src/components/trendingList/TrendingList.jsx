/* eslint-disable react/prop-types */
import './trendingList.scss'
import React, { useRef, useState } from 'react'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import TrendingItem from '../trendingItem/TrendingItem'

const TrendingList = ({ data, title, type }) => {
  const [isMoved, setIsMoved] = useState(false)
	const [slideNumber, setSliderNumber] = useState(0)
	const listRef = useRef()

	const handleClick = (direction) => { 
		setIsMoved(true)
		let distance = listRef.current.getBoundingClientRect().x - 50
		if (direction === 'left' && slideNumber > 0) {
			setSliderNumber(slideNumber - 1)
			listRef.current.style.transform = `translateX(${230 + distance}px)`
		}

		if (direction === 'right' && slideNumber < 5) {
			setSliderNumber(slideNumber + 1)
			listRef.current.style.transform = `translateX(${-230 + distance}px)`
		}
	}

  return (
    <div className="trendingList">
			<span className="listTitle">{title}</span>
			<div className="wrapper">
				<ArrowBackIosNewOutlinedIcon
					className="sliderArrow left"
					onClick={() => handleClick('left')}
					style={{ display: !isMoved && 'none' }}
				/>
				<div className="container" ref={listRef}>
					{data.map((item, i) => (
						<TrendingItem index={i} item={item} key={item.id} type={type}/>
					))}
				</div>

				<ArrowForwardIosOutlinedIcon
					className="sliderArrow right"
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
  )
}

export default TrendingList