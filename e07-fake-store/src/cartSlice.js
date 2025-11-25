import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addProduct: (state, action) => {
            const tempt = state.cart.find(p => p.id === action.payload.id)
            if (tempt) {
                tempt.quantity++
            } else {
                state.cart.push({
                    "id": action.payload.id,
                    "image": action.payload.image,
                    "title": action.payload.title,
                    "price": action.payload.price,
                    "quantity": 1
                })
            }
        },
        removeProduct: (state, action) => {
            state.cart = state.cart.filter(p => p.id !== action.payload)
        },
    }
})

const { actions, reducer } = cartSlice;

export const { addProduct, removeProduct } = actions;

export default reducer;