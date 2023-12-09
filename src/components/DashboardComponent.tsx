import React from 'react'
import {useAppDispatch} from '@/redux/hooks'
import {addProduct} from '@/redux/features/productsSlice'

export default function DashboardComponent() {

  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick = {()=>{
        dispatch(addProduct())
      }}
      >
        Add Product
      </button>
    </div>
  )
}
