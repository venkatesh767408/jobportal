import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appcontext } from '../contexts/Appcontext';
import Loading from '../contexts/Loading';
import Navigation from '../Components/Navigation';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useAuth} from '@clerk/clerk-react'

const Applyjob = () => {
  const { id } = useParams();
  const { jobs, userData, userApplications } = useContext(Appcontext);
  const [jobsdata, setJobsdata] = useState(null);
  const navigate = useNavigate();
   const {getToken}=useAuth();
  const fetchjobs = async () => {
    try {
      const { data } = await axios.get(`https://jobportal-vert-sigma.vercel.app/api/jobs/${id}`);
      if (data.success) {
        setJobsdata(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
 const applyhandler = async (jobId) => {
  
  console.log(userData)
  try {
   

    if (!userData.resume) {
      navigate('/applicationpage');
      return toast.error("Please upload your resume to apply for the job");
    }

    const token = await getToken();

    const { data } = await axios.post(
      'https://jobportal-vert-sigma.vercel.app/api/users/apply',
       { jobId: jobsdata._id }, // ✅ correctly sending the jobId
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.success) {
      toast.success("Applied successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
};


  useEffect(() => {
    fetchjobs();
  }, [id]);
  useEffect(() => {
    if (!userData) {
      toast.error("Please login to apply for the job");
    }
  }, [userData]);  // This will trigger when userData changes
  

  return jobsdata ? (
    <>
      <Navigation />
      <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
        <div className="bg-white shadow-md rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-4 items-start">
            <img
              src={jobsdata.companyId.image}
              alt="company_logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md"
            />
            <div>
              <h2 className="text-xl font-semibold">{jobsdata.title}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} alt="suit-icon" className="w-4 h-4" />
                  {jobsdata.companyId.name}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.location_icon} alt="location-icon" className="w-4 h-4" />
                  {jobsdata.location}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.person_icon} alt="level-icon" className="w-4 h-4" />
                  {jobsdata.level}
                </span>
                <span className="flex items-center gap-1">
                  <img src={assets.money_icon} alt="money-icon" className="w-4 h-4" />
                  {kconvert.convertTo(jobsdata.salary)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
            <button onClick={() => applyhandler(jobsdata._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Apply
            </button>
            <p className="text-gray-400 text-sm">{moment(jobsdata.data).fromNow()}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: jobsdata.description }} />
          <div className="mt-4">
            <button onClick={() => applyhandler(jobsdata._id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Apply
            </button>
            <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ml-4">
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Applyjob;
