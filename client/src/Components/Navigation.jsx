import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'
import {Link} from "react-router-dom"
import { Appcontext } from '../contexts/Appcontext.jsx'
const Navigation = () => {
    const {openSignIn}=useClerk();
    const {user}=useUser();
    const {setShowrecruiterlogin}=useContext(Appcontext);
  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img src={assets.logo} alt="logo"></img>
            {
              user?<div className='flex items-center gap-3'>
              <Link to='/applicationpage'>Applied jobs</Link>
              
               <p>|</p>
               <h1 className='max-sm:hidden'>{user.firstName+" "+user.lastName}</h1>
              </div> 
              : 
              <div className='flex gap-4 max-sm:text-xs'>
              <button onClick={e => setShowrecruiterlogin(true)} className='text-gray-600 cursor-pointer'>RecruterLogin</button>
              <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer'>UserLogin</button>
          </div>

            }
            
        </div>
    </div>
  )
}

export default Navigation