import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export const useAuthentication = () => {
    const { data } = useSession();
    const token = localStorage.getItem('token');
    const router = useRouter()
  
    useEffect(() => {
      if (!data && !token) {
        router.push('/login');
      }
    }, [data, token, router]);
  };
  