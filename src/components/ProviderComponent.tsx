'use client'
import { ThemeProvider } from '@material-tailwind/react'
import { SessionProvider } from 'next-auth/react'
import {Providers} from '@/redux/provider'
import { ReactNode } from 'react';

interface ProvidersComponentProps {
    children: ReactNode;
  }

const ProvidersComponent: React.FC<ProvidersComponentProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Providers>
          {children}  
        </Providers>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default ProvidersComponent