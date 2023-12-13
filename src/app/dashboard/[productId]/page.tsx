import EditComponent from '@/components/EditComponent'
import React from 'react'

export default function EditPage({params}: any) {
    const {productId} = params

  return (
    <div>
      <EditComponent productId={productId}/>
    </div>
  )
}
