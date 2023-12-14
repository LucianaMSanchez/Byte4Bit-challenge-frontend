'use client'

import { Spinner } from '@material-tailwind/react'

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-21rem)] grid items-center justify-center">
      <Spinner className="h-16 w-16 text-blue-900/50" />
    </div>
  )
}

export default Loading