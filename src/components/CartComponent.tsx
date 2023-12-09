import React from 'react'
import { useAppSelector} from '@/redux/hooks'  

export default function CartComponent() {

    const cart = useAppSelector(state => state.cartReducer.cart)

    return (
    <div>

    </div>
  )
}
