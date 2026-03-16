import React from 'react'
import PublicNavBar from '../components/navbar.jsx'
import { Outlet} from 'react-router-dom'

const publicLayout = () => {
  return (
    <div>
        <PublicNavBar />
        <Outlet/>
    </div>
  )
}

export default publicLayout