
import JobApplication from "../models/jobApplication.js"
import User from "../models/User.js"
import Job from "../models/job.js"
import {v2 as cloudinary} from "cloudinary"
import mongoose from 'mongoose';
import { Readable } from 'stream';
//get user data

export const getUserData = async (req,res)=>{

   const userId=req.auth.userId
   try{
    const user=await User.findById(userId)
    if(!user){
        return res.json({success:false,message:'User not found'})
    }
    return res.json({success:true,user})
   }catch(error){
     res.json({success:false,message:error.message})
   }
}

// Apply for a job

export const applyforJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId; // Getting the userId from the request

  try {
    // Check if the user has already applied for this job
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    
    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already applied for this job" });
    }

    // Get job data from the Job model
    const jobData = await Job.findById(jobId);
    
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    // Create the new job application
    await JobApplication.create({
      userId,         // Directly use the userId string
      companyId: jobData.companyId, // The company ID from the job
      jobId,          // The job ID
      date: Date.now(), // Current date/time
    });

    return res.json({ success: true, message: 'Applied successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//get user applied applications
export const getUserjobApplications=async (req,res)=>{
    try{
        const userId=req.auth.userId
        const application=await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()
        if(!application){
            return res.json({success:false,message:'No applications found'})
        }
        res.json({success:true,application})
    }catch(error){
        res.json({success:false,message:error.message})
    }

}
//update user profile(resume)
 /*export const updateuserResume= async (req,res)=>{
        try{
            const userId=req.auth.userId
            const resumeFile=req.file
            const userData=await User.findById(userId)
            if(resumeFile){
                const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
                userData.resume=resumeUpload.secure_url
            }
            await userData.save()
            return res.json({success:true,message:"Resume Updated"})
        }catch(error){
            res.json({success:false,message:error.message})
        }
}
*/
export const updateuserResume = async (req, res) => {
  try {
    const userId = req.auth.userId; // Assuming you have authentication middleware
    const resumeFile = req.file; // This will contain the file from the memory storage

    // Fetch user data from database
    const userData = await User.findById(userId);

    if (resumeFile) {
      // Upload resume file to Cloudinary and get the file URL
      const uploadResult = await streamUpload(resumeFile.buffer);
      userData.resume = uploadResult.secure_url; // Store the URL of the uploaded resume
    }

    // Save the user data with the updated resume URL
    await userData.save();

    return res.json({ success: true, message: 'Resume Updated' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
