import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'

import {
  Home,
  Checkout,
  Login,
  Signup,
  Cart,
  ProductDetails,
  Shop
} from '../pages/index'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/shop/:slug' element={<ProductDetails />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<ProtectedRoute> <Checkout /> </ProtectedRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default Routers