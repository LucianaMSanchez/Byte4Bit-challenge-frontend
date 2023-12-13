"use client"
import SuccessComponent from '@/components/SuccessComponent';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
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
      <SuccessComponent session={sessionState}/>
    </div>
  )
}
