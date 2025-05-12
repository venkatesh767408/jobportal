import React from 'react';
import moment from 'moment';
import { manageJobsData } from '../assets/assets'; // adjust the import path
import {useNavigate} from 'react-router-dom'
import { Appcontext } from '../contexts/Appcontext';
import { useState,useContext,useEffect } from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';

const ManageJobs = () => {
    const navigate=useNavigate();
    const [jobs,setJobs]=useState([]);
    const {companyToken}=useContext(Appcontext);
    
    //function to fetch company Job Application data
 const fetchCompanyJobs=async ()=>{
        try{
          const {data}=await axios.get(`https://jobportal-vert-sigma.vercel.app/api/company/list-jobs`,
            {headers:{
              'Authorization':`Bearer ${companyToken}`
            }}
          )
          if(data.success){
                setJobs(data.jobsData.reverse());
            
          }else{
         toast.error(data.message)
        }
        }catch(error){
           toast.error(error.message)
        }
    }
    // change job visibility
  const changeJobVisibility=async (id)=>{
             try{
              const {data}=await axios.put('https://jobportal-vert-sigma.vercel.app/api/company/change-visibility',
                {
                 id,
                },{
                headers: {
                      Authorization: `Bearer ${companyToken}`
                    }
                  }
                  
                );
                
                if(data.success){
                  toast.success(data.message);
                  fetchCompanyJobs()
             }else{
              
              toast.error(data.message);
             }
  }catch(error){
    toast.error(error.message)
  }
}
  useEffect(()=>{
        if(companyToken){
          fetchCompanyJobs()
        }
    },[companyToken])
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Jobs</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Applications</th>
              <th className="px-6 py-4">Visible</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {jobs.map((job, index) => (
              <tr key={job._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{moment(job.date).format('MMM D, YYYY')}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">{job.applicants}</td>
                <td className="px-6 py-4">
                 <input onChange={()=> changeJobVisibility(job._id)} className='scale-125 ml-4' type='checkbox' checked={job.visible}></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button className='bg-black text-white py-2 px-4 rounded' onClick={()=> navigate('/Dashboard/add-job')}>Add New Job</button>
      </div>
    </div>
  );
};


export default ManageJobs;
