import DetailComponent from '@/components/DetailComponent';
import React from 'react';

export default function DetailPage( {params}: any) {
  const {productId} = params

  return (
    <div>
      <DetailComponent productId={productId}/>
    </div>
  );
}
