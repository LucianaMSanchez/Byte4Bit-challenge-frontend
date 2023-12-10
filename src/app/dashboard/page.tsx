import DashboardComponent from '@/components/DashboardComponent'
import { useAuthentication } from '@/utils/TokenAuth'


import React from 'react'

export default function DashboardPage() {
  useAuthentication()
  return (
    <div>
      <DashboardComponent/>
    </div>
  )
}
