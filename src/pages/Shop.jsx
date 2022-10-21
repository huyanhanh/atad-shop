import React, { useState } from 'react'

import { AiOutlineSearch } from 'react-icons/ai'

import Helmet from '../components/Helmet/Helmet'
import Grid from '../components/Grid/Grid'
import Section, { SectionTitle, SectionBody } from '../components/Section/Section'
import products from '../assets/data/product'
import ProductList from '../components/Products/ProductList'


const Shop = () => {

	const [productsData, setProductsData] = useState(products)

	const handleFilterPrice = (e) => {
		const getFilterPrice = e.target.value

		if (getFilterPrice === 'ascending') {
			const filterByPrice = products.sort((a, b) => b.price - a.price)
			const newProducts = [...filterByPrice]
			setProductsData(newProducts)
		}

		if (getFilterPrice === 'descending') {
			const filterByPrice = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
			const newProducts = [...filterByPrice]
			setProductsData(newProducts)

		}
	}

	const handleFilterCategory = (e) => {
		const getValueFilter = e.target.value
		const filterProducts = products.filter(item => item.category === getValueFilter)
		setProductsData(filterProducts)
	}



	const handleSeachInput = (e) => {
		const seachTerm = e.target.value
		const searchBox = products.filter((item) => {
			return item.productName.toLowerCase().includes(seachTerm.toLowerCase())
		})

		setProductsData(searchBox)
	}

	return (
		<Helmet title='Shop'>
			{/* Top  */}
			<Section>
				<SectionTitle>Products</SectionTitle>
				<SectionBody>
					<div className='toolbars'>

						<Grid col={3} mdCol={3} smCol={1}>
							<div className='toolbars__filter'>
								<div className='toolbars__filter__widget filter__widget'>
									<select onChange={handleFilterCategory}>
										<option > Filter by Category</option>
										<option value="earphones">Earphones</option>
										<option value="headphones">Headphones</option>
										<option value="speaker">Speaker</option>
										<option value="watch">Watch</option>
									</select>
								</div>
							</div>

							<div className='toolbars__sort'>
								<div className='toolbars__sort__widget filter__widget'>
									<select onChange={handleFilterPrice}>
										<option > Sort By</option>
										<option value="ascending">Ascending</option>
										<option value="descending">Descending</option>
									</select>
								</div>
							</div>

							<div className='toolbars__search'>
								<div className='toolbars__search__box filter__widget'>
									<input
										type='text'
										placeholder='Searching.......'
										onChange={handleSeachInput}
									/>
									<span className='icon-search'>
										<AiOutlineSearch />
									</span>
								</div>
							</div>
						</Grid>
					</div>
				</SectionBody>
			</Section >

			<Section>
				<SectionBody>
					<Grid col={4} mdCol={2} smCol={1} gap={20} >
						{
							productsData.length === 0
								? <h1>No products are here</h1>
								: (
									<ProductList data={productsData} />
								)

						}
					</Grid>
				</SectionBody>
			</Section>
		</Helmet >
	)
}

export default Shop