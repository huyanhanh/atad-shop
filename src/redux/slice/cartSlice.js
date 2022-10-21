import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, actions) => {
            const newItem = actions.payload
            const existingItem = state.cartItems.find((item) => item.slug === newItem.slug)

            state.totalQuantity++

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    slug: newItem.slug,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + (Number(item.price) * Number(item.quantity))
            }, 0)
           
        },  

        delItem: (state, actions) => {
            const id = actions.payload
            const exitstingItem = state.cartItems.find((item) => item.id === id)

            if(exitstingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - exitstingItem.quantity
            }

            state.totalAmount = state.cartItems.reduce((total, item) => {
                return total + (Number(item.price) * Number(item.quantity))
            }, 0)
        }
    }
});

export const cartActions = cartSlice.actions

export default cartSlice.reducer