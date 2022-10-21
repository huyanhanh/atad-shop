import React from 'react'

import Button from '../Button/Button'
import Clock from './Clock'
import imageCoundown from '../../assets/images/headphones_a_1.webp'
import { Link } from 'react-router-dom'

const BannerCoundown = () => {
	return (
		<div className='banner__countdown'>
			<div className='banner__countdown__left'>
				<div className='banner__countdown__left-content'>
					<h3>Limited OFF Discount 20%</h3>
					<h4>Quality Luxury</h4>
					<Clock />
				</div>
				<div className='banner__countdown__left-btn'>
					<Link to='/shop'>
						<Button bg={'orange'}>Visit Shop</Button>
					</Link>
				</div>
			</div>
			<div className='banner__countdown-image'>
				<img src={imageCoundown} alt="count_down"/>
			</div>
		</div>
	)
}

export default BannerCoundown