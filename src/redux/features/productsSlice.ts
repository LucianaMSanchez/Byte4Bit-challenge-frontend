import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        addProduct: (state) => {
            state.products = [...state.products, ]
        },
        removeProduct: (state) => {
            state.products = [...state.products, ]
        },
        updateProduct: (state) => {
            state.products = [...state.products, ]
        }
    }
})

export const {addProduct, removeProduct, updateProduct} = productsSlice.actions

export default productsSlice.reducer