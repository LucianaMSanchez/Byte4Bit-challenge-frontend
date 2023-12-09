import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Product} from '@/interfaces/Product'

export const productApi = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost3001/api/products"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => "products"
        }),
        getProductById: builder.query<Product, {id: string}>({
            query: (id) => `products/${id}`
        }),
        getProductByTitle: builder.query<Product, {title: string}>({
            query: (title) => `products?name=${title}`
        })
    })
})

export const {useGetProductsQuery, useGetProductByIdQuery} = productApi