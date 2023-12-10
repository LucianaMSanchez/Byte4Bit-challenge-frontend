"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export const useAuthentication = () => {
    const { data } = useSession();
    const token = localStorage.getItem('token');
    const router = useRouter()

      if (!data && !token) {
        router.push('/login');
      }
 
  };
  