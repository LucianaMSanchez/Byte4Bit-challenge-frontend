"use client"
import React, { useEffect, useState } from 'react'
import {useGetProductsQuery} from '@/redux/services/productApi'
import { CardComponent } from './CardComponent'
import { Product } from '@/interfaces/Product'
import { ApiError } from '@/interfaces/ApiError'


export default function HomeComponent() {

  const {data: products, error, isLoading, isFetching} = useGetProductsQuery(null)
  const [errors, setErrors] = useState("")

  useEffect(()=>{
    if (error) {
      const apiError = error as ApiError;
      if (apiError.data) {
        setErrors(apiError.data);
      }
    }
  },[error])

  if (isLoading || isFetching) return <p>...Loading</p>
  


  return (
    <div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 p-20">
      {errors && <span>{errors}</span>}
      {products?.map((product: Product) => (
        <div key={product.id}> 
          <CardComponent product={product} />
        </div>
      ))}
    </div>
  )
}
