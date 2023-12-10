import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import {productApi} from './services/productApi'
import { userApi } from './services/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer : {
        cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware, 
    ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch