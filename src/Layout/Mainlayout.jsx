import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { Outlet } from 'react-router'


function Mainlayout() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default Mainlayout