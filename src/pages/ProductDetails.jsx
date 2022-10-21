import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { toast } from 'react-hot-toast'

import Helmet from '../components/Helmet/Helmet'
import Gird from '../components/Grid/Grid'
import Section, { SectionTitle, SectionBody } from '../components/Section/Section'
import Button from '../components/Button/Button'
import Grid from '../components/Grid/Grid'
import ProductList from '../components/Products/ProductList'

import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slice/cartSlice'

import products from '../assets/data/product'

const ProductDetails = () => {
	const { slug } = useParams()
	const product = products.find(item => item.slug === slug)
	const [activeTab, setActiveTab] = useState('desc')
	const [rating, setRating] = useState(null)
	const reviewUser = useRef('')
	const reviewMsg = useRef('')

	const dispatch = useDispatch()

	const {
		id,
		productName,
		imgUrl,
		price,
		category,
		avgRating,
		reviews,
		description,
		shortDesc
	} = product

	const relatedProducts = products.filter(item => item.category === category)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [slug])

	const submitHandler = (e) => {
		e.preventDefault()
		const reviewUserName = reviewUser.current.value
		const reviewUserMsg = reviewMsg.current.value

		const reviewObj = {
			useName: reviewUserName,
			text: reviewUserMsg,
			rating
		}

		// console.log([...reviewObj, {
		// 	useName: reviewUserName,
		// 	text: reviewUserMsg,
		// 	rating
		// }])
	}

	const addToCart = () => {
		dispatch(cartActions.addItem({
			id,
			slug,
			imgUrl,
			productName,
			price
		}))

		toast.success(`${productName} - added to cart`)
	}

	return (
		<Helmet title={`${productName}`}>
			<Section>
				<SectionBody>
					<div className='product-detail'>
						<Gird col={2} mdCol={2} smCol={1} gap={20} >
							<div className='product-detail__left__image'>
								<img src={imgUrl} alt="image-product-detail" />
							</div>
							<div className='product-detail__right'>
								<div>
									<h2 className='product-detail__right-text'>{productName}</h2>
									<div className='product-detail__right__rating'>
										<div className='product-detail__right__rating-star'>
											<span><AiFillStar /></span>
											<span><AiFillStar /></span>
											<span><AiFillStar /></span>
											<span><AiFillStar /></span>
											<span><AiOutlineStar /></span>
										</div>
										<p className='product-detail__right__rating-avg'>({avgRating}) - ratings</p>
									</div>

									<span className='product-detail__right__price'>${price}</span>
									<span className='product-detail__right__category'>Category: {category}</span>

									<p className='product-detail__right__short-description'>{shortDesc}</p>
									<Button bg='blue' onClick={addToCart}>
										Add to Cart
									</Button>
								</div>
							</div>
						</Gird>
					</div>
				</SectionBody>
			</Section>

			<Section>
				<SectionBody>
					<Grid col={1}>
						<div className={`tab-wrapper `} >
							<span className={`
								tab-desc 
								${activeTab === 'desc' ? 'active' : ''}
								`}
								onClick={() => setActiveTab('desc')}
							>
								Description
							</span>
							<span className={`
								tab-review
								${activeTab === 'rev' ? 'active' : ''}
								`}
								onClick={() => setActiveTab('rev')}
							>
								Reviews ({reviews.length})
							</span>
						</div>

						<div className='tab__content'>
							{
								activeTab === 'desc' ? (
									<p className='tab__content-desc'>{description}</p>
								) : (
									<div className='tab-content__review'>
										<ul>
											{reviews.map((review, index) => (
												<li key={index}>
													<h6 className='tab-content__review-text'>Jack Dawnson </h6>
													<span className='tab-content__review-rating'>{review.rating} - (rating)</span>
													<p className='tab-content__review-cmt'>{review.text}</p>
												</li>
											))}
										</ul>

										<div className='tab-content__review__form'>
											<h3>Leave your review</h3>
											<form action='' onSubmit={submitHandler}>

												<div className='tab-content__review__form-star'>
													<span onClick={() => setRating(1)}>
														<AiFillStar />
													</span>
													<span onClick={() => setRating(2)}>
														<AiFillStar />
													</span>
													<span onClick={() => setRating(3)}>
														<AiFillStar />
													</span>
													<span onClick={() => setRating(4)}>
														<AiFillStar />
													</span>
													<span onClick={() => setRating(5)}>
														<AiFillStar />
													</span>
												</div>

												<div className='tab-content__review__form-group'>
													<input type='text' placeholder='Enter name...' ref={reviewUser}/>
												</div>

												<div className='tab-content__review__form-group'>
													<textarea 
														ref={reviewMsg}
														rows={4} 
														col={10} 
														type='text' 
														placeholder='Text message reivew...' />
												</div>

												<div>
													<Button type='submit'>Submit</Button>
												</div>
											</form>
										</div>
									</div>
								)
							}
						</div>
					</Grid>
				</SectionBody>
			</Section>

			<Section>
				<SectionTitle>You might also like</SectionTitle>
				<SectionBody>
					<Grid col={4} mdCol={2} smCol={1}>
						<ProductList data={relatedProducts} />
					</Grid>
				</SectionBody>
			</Section>
		</Helmet>
	)
}

export default ProductDetails