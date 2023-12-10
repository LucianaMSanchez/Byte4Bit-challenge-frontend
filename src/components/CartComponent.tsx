"use client"
import React from 'react'
import { useAppSelector} from '@/redux/hooks'  
import useAuthentication from '@/utils/tokenAuthentication'


export default function CartComponent() {
    useAuthentication()
    const cart = useAppSelector(state => state.cartReducer.cart)

    return (
    <div>

    </div>
  )
}
