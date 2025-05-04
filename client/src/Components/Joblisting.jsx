import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { Appcontext } from '../contexts/Appcontext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import Jobcard from './Jobcard';
const Joblisting = () => {
    const { searchFilter, isSearched, setSearchFilter, jobs } = useContext(Appcontext);
    const [jobfilter, setJobfilter] = useState(true);
    const [currentPage,setCurrentPage]=useState(1);
    const [selectedCategories,setSeletedCategories]=useState([]);
    const [selectedLocations,setselectedLocation]=useState([]);
    const [filteredjobs,setFilteredjobs]=useState([]);
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };
      
      const handleNextPage = () => {
        if (currentPage < Math.ceil(jobs.length / 6)) setCurrentPage(currentPage + 1);
      };
      const handlecategory=(category)=>{
           setSeletedCategories(
            prev => prev.includes(category) ? prev.filter(c => c!==category) : [...prev,category]
           )
      }
      const handlelocation=(location)=>{
        setselectedLocation(
         prev => prev.includes(location) ? prev.filter(c => c!==location) : [...prev,location]
        )
   }
   useEffect(()=>{
    const matchcategories= job => selectedCategories.length===0 || selectedCategories.includes(job.category)
    const matchlocations= job => selectedLocations.length===0 || selectedLocations.includes(job.location)
    const matchtitles=job => searchFilter.title==='' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchsearchlocations=job => searchFilter.location==='' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
    const newsearchfilterjobs=jobs.slice().reverse().filter(
         job => matchcategories(job) && matchlocations(job) && matchtitles(job) && matchsearchlocations(job))
    setFilteredjobs(newsearchfilterjobs);
    setCurrentPage(1);
   },[jobs,selectedCategories,selectedLocations,searchFilter]
    
   )
    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Search filter from hero component getting values */}
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <>
                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 text-gray-600'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                    {searchFilter.title}
                                    <img src={assets.cross_icon} alt="cancel" className='cursor-pointer' onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='ml-2 inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                    {searchFilter.location}
                                    <img src={assets.cross_icon} alt="cancel" className='cursor-pointer' onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} />
                                </span>
                            )}
                        </div>
                    </>
                )}
                <button onClick={e => setJobfilter(pre => !pre)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {searchFilter ? "Close" : "Filters"}
                </button>

                {/* Category Filter */}
                <div className={jobfilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map((category, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input className='scale-125' type="checkbox" onChange={()=>handlecategory(category)}   checked={selectedCategories.includes(category)}/>
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={jobfilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input className='scale-125' type="checkbox"   onChange={()=>handlelocation(location)}
                                checked={selectedLocations.includes(location)}/>
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Section */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {/* Job cards go here */}
                    {filteredjobs.slice((currentPage-1)*6,currentPage*6).map((job, index) =>
                        <Jobcard key={index} job={job}></Jobcard>
                    )}
                </div>
                {/*pagination */}
                {
                    filteredjobs.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                            {/* Left Arrow */}
                            <button
                                onClick={handlePrevPage}
                                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                <img src={assets.left_arrow_icon} alt="Previous Page" className="w-4 h-4" />
                            </button>

                            {/* Pagination Numbers */}
                            {Array.from({ length: Math.ceil(filteredjobs.length / 6) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-black hover:bg-blue-100'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* Right Arrow */}
                            <button
                                onClick={handleNextPage}
                                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                disabled={currentPage === Math.ceil(filteredjobs.length / 6)}
                            >
                                <img src={assets.right_arrow_icon} alt="Next Page" className="w-4 h-4" />
                            </button>
                        </div>
                    )
                }

            </section>
        </div>

    )
}

export default Joblisting