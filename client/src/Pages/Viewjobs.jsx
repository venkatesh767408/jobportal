import React from 'react';
import { Appcontext } from '../contexts/Appcontext';
import { useEffect,useState ,useContext} from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../contexts/Loading';

const Viewjobs = () => {
  const {companyToken}=useContext(Appcontext);
  const [applicants,setApplicants]=useState([]);

  const fetchCompanyJobApplications=async ()=>{
    try{
      const {data}=await axios.get(`http://localhost:5000/api/company/applicants`,
        {
          headers:{
            'Authorization':`Bearer ${companyToken}`
          }
        }
      );
      if(data.success){
        setApplicants(data.applications.reverse());
        
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message)
    }
  }
 
  // function to update Job Applications status
  const changeJobApplicationStatus=async (id,status) =>{
          try{
            const {data}=await axios.put(`http://localhost:5000/api/company/change-status`,
              {id,status},
              {
                headers:{
                  'Authorization':`Bearer ${companyToken}`
                }
              }
            )
            if(data.success){
              fetchCompanyJobApplications();
            }else{
              toast.error(data.message);
            }
          }catch(error){
            toast.error(error.message);
          }
  }
  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobApplications();
    }
  },[companyToken])
    return applicants ? applicants.length===0?(<div></div>):(
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Applications</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Resume</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr
                key={applicant._id}
                className="border-t hover:bg-gray-50 transition group"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={applicant.userId.image}
                    alt={applicant.userId.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{applicant.userId.name}</td>
                <td className="px-6 py-4">{applicant.jobId.title}</td>
                <td className="px-6 py-4">{applicant.jobId.location}</td>
                <td className="px-6 py-4">
                  <a 
                    href={applicant.userId.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 text-blue-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-100 transition"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="Download"
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="px-6 py-4 relative">
                  {applicant.status==='Pending' ?
                  <div className="relative inline-block text-left">
                    <button className="text-gray-500 font-bold px-2 text-xl">⋯</button>

                    {/* Dropdown menu visible only on hover (group-hover) */}
                    <div className="absolute right-0 z-10 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
                      <button onClickCapture={()=> changeJobApplicationStatus(applicant._id,'Accepted')}
                        className="w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                        onClick={() => alert(`Accepted: ${applicant.name}`)}
                      >
                        Accept
                      </button>
                      <button onClickCapture={()=> changeJobApplicationStatus(applicant._id,'Rejected')}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                        onClick={() => alert(`Rejected: ${applicant.name}`)}
                      >
                        Reject
                      </button>
                    </div>
                  </div> : <div>{applicant.status}</div>
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) :<Loading></Loading>
};

export default Viewjobs;
