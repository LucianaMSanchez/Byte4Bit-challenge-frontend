import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/interfaces/Product";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [] as Product[]
    },
    reducers: {
        addProductToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.cart.find((product) => product._id === action.payload._id);
      
            if (existingProduct) {
              existingProduct.quantity = (existingProduct.quantity || 0) + 1;
            } else {
              state.cart.push({ ...action.payload, quantity: 1 });
            }
          },
          removeProductFromCart: (state, action: PayloadAction<string>) => {
            const existingProduct = state.cart.find((product) => product._id === action.payload);
          
            if (existingProduct) {
              if (existingProduct.quantity && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
              } else {
                state.cart = state.cart.filter((product) => product._id !== action.payload);
              }
            }
          },
          clearCart: (state) => {
            state.cart = []
          }
    }
})

export const {addProductToCart, removeProductFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer