import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/interfaces/Product";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [] as Product[]
    },
    reducers: {
        addProductToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.cart = [...state.cart, product];
        },
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            const productIdToRemove = action.payload;
            state.cart = state.cart.filter((product) => product.id !== productIdToRemove);
        }
    }
})

export const {addProductToCart, removeProductFromCart} = cartSlice.actions

export default cartSlice.reducer