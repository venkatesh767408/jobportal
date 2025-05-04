import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen">
    {/* Navbar for Recruiter Panel */}
    <div className="shadow py-4">
      <div className="px-5 flex justify-between items-center">
        
        {/* Logo */}
        <img
          className="max-sm:w-32 cursor-pointer"
          src={assets.logo}
          alt="Logo" onClick={()=> navigate('/') }
        />
  
        {/* Right side */}
        <div className="flex items-center gap-3">
          <p className="max-sm:hidden">Welcome, Greatestack</p>
  
          {/* Company Profile + Dropdown */}
          <div className="relative group">
            <img
              className="w-8 border rounded-full cursor-pointer"
              src={assets.company_icon}
              alt="Company Icon"
            />
  
            {/* Dropdown on hover */}
            <div className="absolute hidden group-hover:block right-0 right-0 z-10 text-black rounded pt-12">
              <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div>
        </div>
  
      </div>
    </div>
    <div className='flex items-start'>
        {/* left side bar*/}
        <div className='inline-block min-h-screen border-r-2'>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                <NavLink to={'/Dashboard/add-job'} className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
                <img src={assets.add_icon} alt="" className='min-w-4'/>
                <p className='max-sm:hidden' >Add job</p>
                </NavLink>
                <NavLink to={'/Dashboard/view-job'} className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
                <img src={assets.person_tick_icon} alt="" className='min-w-4'/>
                <p className='max-sm:hidden'>ViewApplications</p>
                </NavLink>
                <NavLink to={'/Dashboard/manage-jobs'} className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
                <img src={assets.home_icon} alt="" className='min-w-4'/>
                <p className='max-sm:hidden'>ManageJobs</p>
                </NavLink>
                
            </ul>
        </div>
        <div>
            <Outlet></Outlet>
        </div>

    </div>
  </div>
 
  )
}

export default Dashboard