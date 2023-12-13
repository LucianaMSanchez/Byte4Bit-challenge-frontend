"use client"

import CancelledComponent from '@/components/CancelledComponent';
import { useEffect, useState } from 'react';

export default function CancelledPage() {
    const [sessionState, setSessionState] = useState()

    useEffect(() => {
        const url = window.location.href;
        const queryString = url.split('?')[1]; 
        
        if (queryString) {
          const params = new URLSearchParams(queryString);
          const session_id = params.get('session_id');
          setSessionState(session_id as any)
        }
        }, [])
  return (
    <div>
      <CancelledComponent session={sessionState}/>
    </div>
  )
}
