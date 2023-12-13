"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const useAuthorization = () => {
  if (typeof window !== 'undefined') {
  const { data } = useSession();

  const router = useRouter();

  if (data?.user?.role !== "admin") {
    router.push('/');
    return false; 
  }
  }
  return true; 
};

export default useAuthorization;