import React from 'react'

import { Link } from 'react-router-dom'
import { BsCartPlus } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slice/cartSlice'

const ProductCard = ({ item }) => {
  const {slug, productName, price, imgUrl, id} = item
  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      slug,
      productName,
      price,
      imgUrl
    }))
    toast.success(`${productName} - added to cart`)

  }

  return (
    <div className='product-card'>
      <Link to={`/shop/${slug}`}>
        <div className='product-card__item'>
          <img
            src={imgUrl}
            alt="product-card"
            width={270}
            height={270}
            className="product-card__item-image"
          />
          <h3 className='product-card__item-name'>
            {productName}
          </h3>
        </div>
      </Link>
      <div className='product-card__bottom'>
        <p className='product-card__bottom__price'>
          $ {price}
        </p>
        <span className='product-card__bottom__to-cart' onClick={addToCart}>
          <BsCartPlus />
        </span>
      </div>
    </div>
  )
}

export default ProductCard