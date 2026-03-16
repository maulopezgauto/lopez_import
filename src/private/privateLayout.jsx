import React from 'react'
import PrivateNavBar from '@/components/privateNavBar'
import {Outlet} from 'react-router-dom'

const privateLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <PrivateNavBar />
        <Outlet />
      </div>
    </div>
  )
}

export default privateLayout