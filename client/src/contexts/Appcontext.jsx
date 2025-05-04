import { createContext,useEffect,useState } from "react";
import { jobsData } from "../assets/assets";
export const Appcontext=createContext();
export const Appcontextprovider=(props)=>{
    const [showrecruiterlogin,setShowrecruiterlogin]=useState(false);

    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })
    const [isSearched,setIsSearched]=useState(false);
    const [jobs,setJobs]=useState([]);
    const fetchjobs=async ()=>{
             setJobs(jobsData);
    }
    useEffect(()=>{
         fetchjobs()
    },[]);
    const value={
       setSearchFilter,searchFilter,isSearched,setIsSearched,
       jobs,setJobs,showrecruiterlogin,setShowrecruiterlogin
    }
    return(
        <Appcontext.Provider value={value}>

        {props.children}
        </ Appcontext.Provider>
    )
}
