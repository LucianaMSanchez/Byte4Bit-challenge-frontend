"use client"
import React from 'react'
import {useAddProductMutation} from '@/redux/services/productApi'
import useAuthentication from '@/utils/tokenAuthentication'
import { useSession } from 'next-auth/react'

export default function DashboardComponent() {
  const { data: session, status } = useSession();
  useAuthentication()

  const addProduct = [useAddProductMutation, {data: product, error}]
  return (
    <div>
      <button onClick = {()=>{
       
      }}
      >
        Add Product
      </button>
    </div>
  )
}
