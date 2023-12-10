"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const useAuthentication = () => {
  if (typeof window !== 'undefined') {
  const { data } = useSession();
  const token = localStorage.getItem('token');
  const router = useRouter();

  if (!data && !token) {
    router.push('/login');
    return false; 
  }
  }
  return true; 
};

export default useAuthentication;