import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Appcontext } from '../contexts/Appcontext';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const Recruiterlogin = () => {
  const navigate=useNavigate();
  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState(null);
  const [isNextStep, setIsNextStep] = useState(false);
  const { setShowrecruiterlogin,setCompanyToken,setCompanyData } = useContext(Appcontext);


  const handleSubmit =async (e) => {
    e.preventDefault();

    if (state === 'signup' && !isNextStep) {
      setIsNextStep(true); // Move to logo upload step
      return;
    }
    try{
           if(state=='login'){
            const {data}=await axios.post('http://localhost:5000/api/company/login',{email,password})
            if( data.success){
              navigate('/Dashboard')
               console.log(data);
               localStorage.setItem('companyToken',data.token)
               setCompanyData(data.company);
               setCompanyToken(data.token);

          
               toast.success(data.message || 'Logged in successfully!');
               

               setShowrecruiterlogin(false);

             
            }else{
              toast.error(data.message)
            }

           }else{
              const formData=new FormData()
              formData.append('name',name)
              formData.append('password',password)
              formData.append('email',email)
              formData.append('image',logo)
              const {data}=await axios.post('http://localhost:5000/api/company/register',formData)
              if(data.success){
                navigate('/Dashboard')
                console.log(data);
                console.log(data);
               localStorage.setItem('companyToken',data.token)
               setCompanyData(data.company);
               setCompanyToken(data.token);
               setShowrecruiterlogin(false);

              }else{
                console.log(data.message);
                toast.error(data.message);
              }
           }
    }catch(error){
         toast.error(error.message);
    }

    // Final submission (signup or login)
    const payload = {
      name,
      email,
      password,
      logo,
    };

    
    alert(state === 'signup' ? 'Account Created!' : 'Logged In');

    // Reset form after submission
    setName('');
    setEmail('');
    setPassword('');
    setLogo(null);
    setIsNextStep(false);
    setState('login');
    setShowrecruiterlogin(false);
  };
   useEffect(()=>{
          document.body.style.overflow='hidden'
          return()=>{
            document.body.style.overflow='unset'
          }
   },[])

  return (
    <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6 relative">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            Recruiter {state === 'signup' ? 'Signup' : 'Login'}
          </h1>
          <img
            src={assets.cross_icon}
            alt="cancel"
            onClick={() => setShowrecruiterlogin(false)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <p className="text-gray-500 dark:text-gray-300 mt-2 text-center">
          Welcome back! Please sign in to continue
        </p>

        {/* If signup and next step: upload logo */}
        {state === 'signup' && isNextStep ? (
          <div>
            <label className="block text-white mb-2">Upload Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full bg-white text-black p-2 rounded"
              required
            />
          </div>
        ) : (
          <>
            {state === 'signup' && (
              <div className="relative">
                <img src={assets.person_icon} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter company name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}

            <div className="relative">
              <img src={assets.email_icon} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="relative">
              <img src={assets.lock_icon} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 shadow-md"
        >
          {state === 'login' ? 'Login' : isNextStep ? 'Submit' : 'Next'}
        </button>

        {state === 'login' ? (
          <p className="text-white text-sm text-center">
            Don’t have an account? <span className="underline cursor-pointer text-blue-300" onClick={() => setState('signup')}>Sign up</span>
          </p>
        ) : (
          <p className="text-white text-sm text-center">
            Already have an account? <span className="underline cursor-pointer text-blue-300" onClick={() => { setState('login'); setIsNextStep(false); }}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Recruiterlogin;
