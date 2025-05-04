import React from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../contexts/Appcontext';
import { useContext,useRef } from 'react';

const Hero = () => {
    const {setSearchFilter,setIsSearched}=useContext(Appcontext);
    const titleRef=useRef(null);
    const locationRef=useRef(null);
    const onsearch=()=>{
       setSearchFilter({
        title:titleRef.current.value,
        location:locationRef.current.value
       });
       setIsSearched(true);
       
    }
    return (
        <div className="container 2xl:px-20 mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                    Over 10000+ Jobs to apply
                </h2>
                <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
                    Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities And Take The First Step Toward Your Future!
                </p>
    
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto px-4">
                    <div className="flex items-center bg-white text-gray-600 rounded w-full">
                        <img src={assets.search_icon} alt="search_icon" className="w-5 h-5 ml-3" />
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            className="text-sm p-3 rounded outline-none w-full"
                            ref={titleRef}
                        />
                    </div>
    
                    <div className="flex items-center bg-white text-gray-600 rounded w-full">
                        <img src={assets.location_icon} alt="location_icon" className="w-5 h-5 ml-3" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="text-sm p-3 rounded outline-none w-full"
                            ref={locationRef}
                        />
                    </div>
    
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"
                        onClick={onsearch}
                    >
                        Search
                    </button>
                </div>
            </div>
    
            {/* "Trusted by" section */}
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md">
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 lg:gap-16 text-center">
                    <p className="font-medium w-full sm:w-auto mb-2 sm:mb-0">Trusted by</p>
                    <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
                    <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
                    <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
                    <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
                    <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
                    <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
                </div>
            </div>
        </div>
    );
    
}

export default Hero