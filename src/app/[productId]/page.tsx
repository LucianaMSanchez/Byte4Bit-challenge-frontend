import DetailComponent from '@/components/DetailComponent'
import React from 'react'
import { useAuthentication } from '@/utils/TokenAuth';

export default function DetailPage() {
  useAuthentication();
  return (
    <div>
      <DetailComponent  />
    </div>
  )
}
