import DashboardComponent from '@/components/DashboardComponent'
import React from 'react'
import { useAuthentication } from '@/utils/tokenAuth';

export default function DashboardPage() {
  useAuthentication();
  return (
    <div>
      <DashboardComponent/>
    </div>
  )
}
