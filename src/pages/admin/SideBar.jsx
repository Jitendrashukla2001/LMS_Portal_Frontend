import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function SideBar() {
    return (
        <div className='flex'>
            <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
                <div className='space-y-4 mt-20'>
                    <Link className="flex items-center gap-2" to="dashboard"><ChartNoAxesColumn size={22} /><h1>Dashboard</h1></Link>
                    <Link className="flex items-center gap-2" to="course"><SquareLibrary size={22} /><h1>Courses</h1></Link>
                </div>
            </div>
            <div className='flex-1 md:p-24 p-2 bg-white'>
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default SideBar