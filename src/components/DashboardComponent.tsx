"use client"
import React from 'react'
import {useAppDispatch} from '@/redux/hooks'
// import {addProduct} from '@/redux/services/productApi'
import useAuthentication from '@/utils/tokenAuthentication'


export default function DashboardComponent() {
  useAuthentication()
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick = {()=>{
        // dispatch(addProduct())
      }}
      >
        Add Product
      </button>
    </div>
  )
}
