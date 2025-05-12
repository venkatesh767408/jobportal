import { createContext,useEffect,useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import {useUser,useAuth} from '@clerk/clerk-react'
export const Appcontext=createContext();
export const Appcontextprovider=(props)=>{
    const [showrecruiterlogin,setShowrecruiterlogin]=useState(false);
    const [companyToken,setCompanyToken]=useState(null);
    const [companyData,setCompanyData]=useState(null);
    const [userData,setUserData]=useState(null);
    const [userApplications,setUserApplications]=useState([]);
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const {user}=useUser()
     
     const {getToken}=useAuth();
    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })
    const [isSearched,setIsSearched]=useState(false);
    const [jobs,setJobs]=useState([]);
    const fetchjobs=async ()=>{
          try{
            const {data}=await axios.get('https://jobportal-vert-sigma.vercel.app/api/jobs')
            if(data.success){
              setJobs(data.jobs)
            
            }else{
              toast.error(data.message);
            }
          }catch(error){
             toast.error(error.message);
          }
    }

    useEffect(()=>{
      if(companyToken){
        fetchCompanyData()
      }
    },[companyToken])
    // function to fetch company data
    const fetchCompanyData = async () => {
        try {
          // Assuming companyToken is already set in the state or context
          const token = companyToken; // Get the token from state or context
      
          // Make the API request with the Authorization header set correctly
          const { data } = await axios.get('https://jobportal-vert-sigma.vercel.app/api/company/getCompany', {
            headers: {
              Authorization: `Bearer ${token}`  // Use 'Authorization' header with 'Bearer <token>'
            }
          });
      
          if (data.success) {
            console.log(data.company);
            setCompanyData(data.company);
          } else {
            toast.error(data.message);  // Handle error response
          }
        } catch (error) {
          toast.error(error.message);  // Handle error during the request
        }
      };
      
      
      // function to fetch user Data
      const fetchUserData=async ()=>{
          try{
                  const token=await getToken();
                  const {data}=await axios.get('https://jobportal-vert-sigma.vercel.app/api/users/user',{
                    headers:{Authorization :`Bearer ${token}`}
                  })
                  if(data.success){
                     setUserData(data.user);
                     console.log(data.user);
                  }else{
                    toast.error(data.message);
                  }
          }catch(error){
              toast.error(error.message)
          }
      }
      //get user applied jobs
    const fetchUserApplications=async ()=>{
      try{
        const token=await getToken();
        const {data}=await axios.get('https://jobportal-vert-sigma.vercel.app/api/users/applications',
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if(data.success){
                 setUserApplications(data.application);
                 
                
                 
          }else{
                 toast.error(data.message);
          }
        
      }catch(error){
        toast.error(error.message)
      }
    }
    useEffect(()=>{
          if(user){
            fetchUserData();
            fetchUserApplications();
          }
    },[user])
    useEffect(()=>{
         fetchjobs()
         const storedCompanytoken=localStorage.getItem('companyToken');
         
         if(storedCompanytoken){
            setCompanyToken(storedCompanytoken)
         }
    },[]);
    
    const value={
       setSearchFilter,searchFilter,isSearched,setIsSearched,
       jobs,setJobs,showrecruiterlogin,setShowrecruiterlogin,companyData,companyToken,setCompanyData,setCompanyToken,backendurl,userData,setUserData,fetchUserData,fetchUserApplications,userApplications,setUserApplications
    }
    return(
        <Appcontext.Provider value={value}>

        {props.children}
        </ Appcontext.Provider>
    )
}
