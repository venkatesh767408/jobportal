import React from 'react'
import {useState,useRef,useEffect} from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
const Addjob = () => {
    const [title,setTitle]=useState('');
    const [location,setLocation]=useState('bangalore');
    const [category,setCategory]=useState('programming');
    const [level,setLevel]=useState('Beginner level');
    const [salary,setsalary]=useState(0);
    const editorRef=useRef(null);
    const quillRef=useRef(null);
    useEffect(()=>{
        if(!quillRef.current && editorRef.current){
            quillRef.current=new Quill(editorRef.current,{
                theme:'snow'
            })
        }
    })
  return (
    <form className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-2">Job Title</label>
      <input
        type="text"
        placeholder="Enter job title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-2">Job Description</label>
      <div
        ref={editorRef}
        className="min-h-[150px] w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
      ></div>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-2">Job Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {JobCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-2">Job Location</label>
        <select
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {JobLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-2">Job Level</label>
        <select
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
    </div>
  
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-2">Job Salary</label>
      <input
        type="number"
        placeholder="Ex: 20000"
        onChange={(e) => setsalary(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  
    <div className="text-right">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
      >
        Add Job
      </button>
    </div>
  </form>
  )  
}

export default Addjob