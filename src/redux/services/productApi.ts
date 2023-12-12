import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Product} from '@/interfaces/Product'

export const productApi = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => "/products",
        }),
        getProductById: builder.query<Product, {id: string}>({
            query: (id) => `/products/${id}`
        }),
        getProductByTitle: builder.query<Product, {title: string}>({
            query: (title) => `/products?name=${title}`
        }),
        addProduct: builder.mutation<Product, Product>({
            query: (newProduct) => ({
              url: '/products',
              method: 'POST',
              body: newProduct,
            }),
        }),
        updateProduct: builder.mutation<Product, Product>({
            query: (newProduct) => ({
              url: `/products/${newProduct.id}`,
              method: 'PUT',
              body: newProduct,
            })
        }),
        deleteProduct: builder.mutation<Product, {id: string}>({
            query: (id) => ({
              url: `/products/${id}`,
              method: 'DELETE',
            })
        }),
})
})

export const {
    useGetProductsQuery, 
    useGetProductByIdQuery, 
    useGetProductByTitleQuery, 
    useUpdateProductMutation, 
    useAddProductMutation,
    useDeleteProductMutation
} = productApi