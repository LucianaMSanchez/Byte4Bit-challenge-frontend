"use client"
import React from 'react'
import { useAppSelector} from '@/redux/hooks'        

export default function HomeComponent() {
  const products = useAppSelector(state => state.productReducer.products)

  return (
    <div>
      
    </div>
  )
}
