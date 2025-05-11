import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const Jobcard = ({job}) => {
  const navigate=useNavigate();
  return (
    <div className='border p-6 shadow-lg rounded-xl bg-white hover:shadow-xl transition-shadow duration-300'>
  {/* Header Section */}
  <div className='flex justify-between items-start mb-4'>
    <img className='h-10 w-10 object-contain' src={job.companyId.image} alt="company icon" />
    <h4 className='font-semibold text-lg text-right text-gray-800 flex-1 ml-4'>{job.title}</h4>
  </div>

  {/* Tags: Location & Level */}
  <div className='flex items-center gap-3 mb-4 text-sm flex-wrap'>
    <span className='bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full'>{job.location}</span>
    <span className='bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full'>{job.level}</span>
  </div>

  {/* Description */}
  <p
    className='text-sm text-gray-600 mb-6'
    dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + "..." }}
  />

  {/* Action Buttons */}
  <div className='flex justify-end gap-3'>
    <button onClick={()=>{navigate(`/apply-job/${job._id}`); scroll(0,0)}}className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer'>Apply</button>
    <button className='border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer'>Learn More</button>
  </div>
</div>

  )
}

export default Jobcard