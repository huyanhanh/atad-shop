import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section/Section'
import Button from '../components/Button/Button'
import Grid from '../components/Grid/Grid'
import { TiDeleteOutline } from 'react-icons/ti'


import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../redux/slice/cartSlice'

const Cart = () => {
	const cartItems = useSelector(state => {
		return state.cart.cartItems
	})

	const totalAmount = useSelector(state => {
		return state.cart.totalAmount
	})

	return (
		<Helmet title={'Cart'}>
			<Section>
				<SectionTitle>Product Cart</SectionTitle>
				<SectionBody>
					<div className='product-cart'>
						<div className='product-cart__left'>
							{
								cartItems.length === 0 ? (
									<h2>No product added to cart</h2>
								) : (
									<table className='table'>
										<thead>
											<tr className='product-cart__left__bars-top'>
												<th>Image</th>
												<th>Product Name</th>
												<th>Price</th>
												<th>Qty</th>
												<th>Delete</th>
											</tr>
										</thead>
										<tbody>
											{
												cartItems.map((item, index) => (
													<Tr item={item} key={index} />
												))
											}
										</tbody>
									</table>
								)
							}
						</div>
						<div className='product-cart__right'>
							<Grid col={1}>
								<div className='product-cart__right-checkout'>
									<h6>SubTotal: </h6>
									<span> ${totalAmount}</span>
								</div>
								<p>
									Taxes and fee shipping will caculate in checkout
								</p>
								<div className="product-cart__right-btn">
									<div className='product-cart__right-btn-checkout'>
										<Link to='/checkout'>
											<Button >Checkout</Button>
										</Link>
									</div>

									<div className='product-cart__right-btn-shop'>
										<Link to='/shop'>
											<Button >Continue Shopping</Button>
										</Link>
									</div>
								</div>
							</Grid>
						</div>
					</div>
				</SectionBody>
			</Section>
		</Helmet>
	)
}

const Tr = ({ item }) => {
	const dispatch = useDispatch()

	const delProductOutCart = () => {
		dispatch(cartActions.delItem(item.id))
	}

	return (
		<tr>
			<td>
				<img src={item.imgUrl} alt="alt" />
			</td>
			<td>{item.productName}</td>
			<td>${item.totalPrice}</td>
			<td>{item.quantity}</td>
			<td
				className='product-cart__left__del'
				onClick={delProductOutCart}
			>
				<TiDeleteOutline />
			</td>
		</tr>
	)
}

export default Cart