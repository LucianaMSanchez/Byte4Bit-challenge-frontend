import CartComponent from '@/components/CartComponent'
import React from 'react'
import { useAuthentication } from '@/utils/tokenAuth';

export default function CartPage() {
  useAuthentication();
  return (
    <div>
      <CartComponent/>
    </div>
  )
}
