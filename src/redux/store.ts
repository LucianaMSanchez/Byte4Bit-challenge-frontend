import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import {productApi} from './services/productApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer : {
        cartReducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([productApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch