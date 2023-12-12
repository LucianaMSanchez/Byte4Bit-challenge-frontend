"use client"
import useAuthentication from '@/utils/tokenAuthentication'
import React from 'react'
import {useAppDispatch} from '@/redux/hooks'


export default function DetailComponent() {
  useAuthentication()
  const dispatch = useAppDispatch()
  return (
    <div>
           dispatch(useAddProductMutation(product))
    </div>
  )
}
