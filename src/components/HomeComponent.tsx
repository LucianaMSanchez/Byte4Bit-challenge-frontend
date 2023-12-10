"use client"
import React from 'react'
import {useGetProductsQuery} from '@/redux/services/productApi'
import { CardComponent } from './CardComponent'
import { Product } from '@/interfaces/Product'


export default function HomeComponent() {

  const {data, error, isLoading, isFetching} = useGetProductsQuery(null)
  
  if (isLoading || isFetching) return <p>...Loading</p>
  if (error) return <p>Error fetching products</p>

  return (
    <div>
      {data?.map((product: Product) => (
        <div key={product.id}> 
          <CardComponent product={product} />
        </div>
      ))}
    </div>
  )
}
