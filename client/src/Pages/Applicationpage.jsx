import React, { useState } from 'react'
import Navigation from '../Components/Navigation'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';

const Applicationpage = () => {
  const [isedite, setIsedit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <Navigation></Navigation>
      <div className='container px-4 min--[65vh] 2xl:px-20 mx-auto my-10 '>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isedite ? <>
              <label className="flex items-center" htmlFor="resumeupload">
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Selecte Resume</p>
                <input id='resumeupload' onChange={e => setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />
                <img src={assets.profile_upload_icon} alt=""></img>
              </label>
              <button className='bg-green-100 border border-green-400 rounded-lg px-4 py-2' onClick={e => setIsedit(false)}>Save</button>
            </> :
              <div className='flex gap-2'>
                <a href="" className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'>Resume</a>
                <button onClick={() => setIsedit(true)} className='text-gray-500 border border-gary-300 rounded-lg px-4 py-2 cursor-pointer'>Edit</button>

              </div>

          }
        </div>
        <h2 className="text-2xl font-semibold mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobsApplied.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={job.logo} alt="logo" className="w-8 h-8 object-contain" />
                    <span>{job.company}</span>
                  </td>
                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{moment(job.date).fromNow()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded ${job.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : job.status === 'Accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

export default Applicationpage