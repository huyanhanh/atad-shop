import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { IoMdArrowDropleft } from 'react-icons/io'
import { IoMdArrowDropright } from 'react-icons/io'

import Button from '../Button/Button'

const SlickSlider = props => {
	const data = props.data

	const [activeSlider, setActiveSlide] = useState(0)

	const timeOut = props.timeOut ? props.nextSlide : 3000

	const prevSlide = () => {
		const index = activeSlider - 1 < 0 ? data.length - 1 : activeSlider - 1
		setActiveSlide(index)
	}

	const nextSlide = useCallback(
		() => {
			const index = activeSlider + 1 === data.length ? 0 : activeSlider + 1
			setActiveSlide(index)
		}
		, [activeSlider, data])

	// auto slide
	useEffect(() => {

		if (props.auto) {
			const slideAuto = setInterval(() => {
				nextSlide()
			}, timeOut)

			return () => {
				clearInterval(slideAuto)
			}
		}

	}, [nextSlide, timeOut, props])

	return (
		<div className='slick-slider'>
			{
				data.map((item) => (
					<div
						key={item.id}
						className={
							`slick-slider__item 
							${item.id === activeSlider ? 'active' : ''}
						`}
					>
						<div className='slick-slider__item__info'>
							<div className='slick-slider__item__info__title'>
								<span>{item.prodName}</span>
							</div>
							<div className='slick-slider__item__info__desc'>
								<span>{item.description}</span>
							</div>
							<div className='slick-slider__item__info__btn'>
								<Link to={item.path}>
									<Button>
										Shopping Now
									</Button>
								</Link>
							</div>
							<div className='slick-slider__item__info__image'>
								<img src={item.imgUrl} alt="slider image" />
							</div>
						</div>

					</div>
				))
			}

			{/* active slider */}
			{
				props.control ? (
					<div className='slick-slider__control'>
						<div
							className='slick-slider__control__item left'
							onClick={prevSlide}
						>
							<IoMdArrowDropleft />
						</div>
						<div className='slick-slider__control__item'>
							<div className='index'>
								{activeSlider + 1} / {data.length}
							</div>
						</div>
						<div
							className='slick-slider__control__item right'
							onClick={nextSlide}
						>
							<IoMdArrowDropright />
						</div>
					</div>
				) : null
			}
		</div>
	)
}

SlickSlider.propTypes = {
	data: PropTypes.array.isRequired,
	control: PropTypes.bool,
	auto: PropTypes.bool,
	timeOut: PropTypes.bool
}

export default SlickSlider