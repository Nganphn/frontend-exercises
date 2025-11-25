import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        loadProducts: (state, action) => {
            state.products = action.payload
        }
    },
});

const { actions, reducer } = productsSlice;
// const actions = productsSlice.actions;
// const reducer = productsSlice.reducer;

export const { loadProducts } = actions;

export default reducer;