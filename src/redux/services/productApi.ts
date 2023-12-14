import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Product} from '@/interfaces/Product'

export const productApi = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/api"
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], null>({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        getProductById: builder.query<Product, {id: string}>({
            query: (id) => `/products/${id}`
        }),
        getProductByTitle: builder.query<Product, string>({
            query: (title) => `/products/search?title=${title}`
        }),
        addProduct: builder.mutation<Product, Product>({
            query: (newProduct) => ({
              url: '/products',
              method: 'POST',
              body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation<Product, Product>({
            query: (newProduct) => ({
              url: `/products/${newProduct._id}`,
              method: 'PUT',
              body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<Product, string>({
            query: (id) => ({
              url: `/products/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ["Products"],
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