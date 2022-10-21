import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import Grid from '../components/Grid/Grid'
import Button from '../components/Button/Button'

import { useSelector } from 'react-redux'

const Checkout = () => {

	const totalQty = useSelector(state => state.cart.totalQuantity)
	const totalAmount = useSelector(state => state.cart.totalAmount)

	const [provinces, setProvinces] = useState([])


	useEffect(() => {
		fetch('https://provinces.open-api.vn/api/')
			.then(res => res.json())
			.then(data => setProvinces(data))


	}, [])


	return (
		<Helmet title={'Checkout'}>
			<div className='checkout-col'>
				<div className='checkout-col-left'>
					<Grid col={1}>
						<div className='checkout'>
							<form className='checkout__form'>
								<label className='checkout__form-label'>Your Name:</label>
								<div className='checkout__form-name custom-input'>
									<input className='checkout-input' type='text' placeholder='Enter your name' />
								</div>

								<label className='checkout__form-label'>Your Email:</label>
								<div className='checkout__form-email custom-input'>
									<input className='checkout-input' type='text' placeholder='Enter your email' />
								</div>

								<label className='checkout__form-label'>Phone Numbers:</label>
								<div className='checkout__form-phone custom-input'>
									<input className='checkout-input' type='text' placeholder='Phone number' />
								</div>

								<label className='checkout__form-label'>Address:</label>
								<div className='checkout__form-address custom-input'>
									<input className='checkout-input' type='text' placeholder='Street Adress' />
								</div>

								<label className='checkout__form-label'>City:</label>
								<div className='checkout__form-city custom-input'>
									<input className='checkout-input' type='text' placeholder='City' />
								</div >

								<label className='checkout__form-label' htmlFor="">Postal Code:</label>
								<div className='checkout__form-postal custom-input'>
									<input className='checkout-input' type='text' placeholder='Postal code' />
								</div>

								<label className='checkout__form-label'>Province:</label>
								<div className='checkout__form-select'>
									<select className='checkout__form-select-option'>
										{
											provinces.map((province) => (
												<option
													value={province.name}
													key={province.code}
												>
													{province.name}
												</option>
											))
										}
									</select>
								</div>
							</form>
						</div>
					</Grid>
				</div>

				<div className='checkout-col-right'>
					<Grid col={1}>
						<div className='checkout-cart'>
							<h6>Total Qty: <span>{totalQty} items</span></h6>
							<h6>Subtotal: <span>${totalAmount}</span></h6>
							<h6>
								<span>Shipping:  <br />
									Free shipping
								</span>
							</h6>
							<h4>Total Cost: <span>${totalAmount}</span></h4>
						</div>
						<Button>Place an order</Button>
					</Grid>
				</div>
			</div>
		</Helmet>
	)
}

export default Checkout