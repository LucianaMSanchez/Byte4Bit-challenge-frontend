"use client"
import React, { useEffect, useState } from 'react'
import {useGetProductsQuery} from '@/redux/services/productApi'
import { CardComponent } from './CardComponent'
import { Product } from '@/interfaces/Product'
import { ApiError } from '@/interfaces/ApiError'
import { signOut } from 'next-auth/react'
import {useRouter} from 'next/navigation'

export default function HomeComponent() {

  const {data: products, error, isLoading, isFetching} = useGetProductsQuery(null)
  const [errors, setErrors] = useState("")
  const router = useRouter()

  useEffect(()=>{
    if (error) {
      const apiError = error as ApiError;
      if (apiError.data) {
        setErrors(apiError.data);
      }
    }
  },[error])

  if (isLoading || isFetching) return <p>...Loading</p>
  
  const handleSignOut = async() => {
    const data = await signOut({redirect: false})
    router.push("/login")
  }

  return (
    <div>
      {errors && <span>{errors}</span>}
      {products?.map((product: Product) => (
        <div key={product.id}> 
          <CardComponent product={product} />
        </div>
      ))}
      <button onClick={handleSignOut}>sign out</button>
    </div>
  )
}
