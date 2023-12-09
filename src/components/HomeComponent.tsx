"use client"
import React from 'react'
import {useGetProductsQuery} from '@/redux/services/productApi'
import Image from 'next/image'

export default function HomeComponent() {

  const {data, error, isLoading, isFetching} = useGetProductsQuery(null)
  
  if (isLoading || isFetching) return <p>...Loading</p>
  if (error) return <p>Error fetching products</p>

  return (
    <div>
      {
      data?.map(product => (
        <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <Image src={product.image} width={600} alt={`${product.title} image`} ></Image>
        </div>
      ))
      }
    </div>
  )
}
