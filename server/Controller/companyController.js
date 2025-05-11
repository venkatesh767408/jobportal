import Company from "../models/company.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";
import JobApplication from "../models/jobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const {name, email, password} = req.body
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {

    return res.json({ success: false, message: "Missing Details" })
  }
  try {
    const companyExists = await Company.findOne({ email })
    if (companyExists) {
      return res.json({ success: false, message: "Email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUpload=await cloudinary.uploader.upload(imageFile.path)
    const company=await Company.create({
      name,
      email,
      password:hashedPassword,
      image:imageUpload.secure_url
    })
    res.json({
      success: true,
      company:{
        _id:company._id,
        name:company.name,
        email:company.email,
        image:company.image


      },
      token: generateToken(company._id)
    })


  } catch (error) {
        res.json({success:false,message:error.message})
  }
}
// Company login
export const loginCompany = async (req, res) => {
 
      const {email, password} = req.body
      try {
        const company = await Company.findOne({ email })
        if(await bcrypt.compare(password,company.password)){
          res.json({
            success: true,
            company:{
              _id:company._id,
              name:company.name,
              email:company.email,
              image:company.image
              },
              token:generateToken(company._id)
        })}
        else{
           res.json({
            success: false,
            message: "Invalid email or password"
           })
        }
        } catch (error) {
          res.json({success:false,message:error.message})
        }
}

//get company data
export const getCompanyData = async (req, res) => {

     const company=req.company
     try{
      res.json({success:true,company})
     }catch(error){
      res.json({
        success:false,message:error.message
      })
     }

}

//Post a new job
export const postJob = async (req, res) => {
  const { title, description,location, salary,level,category}=req.body

 const companyId=req.company._id
 try{
   const newJob=new Job({
    title,
    description,
    location,
    salary,
    companyId,
    date:Date.now(),
    level,
    category
   })
   await newJob.save()
   res.json({success:true,newJob})
 }catch(error){
         res.json({success:false,message:error.message})
 }

}

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
  
  
  try{
     const companyId = req.company._id
     const applications=await JobApplication.find({companyId})
     .populate('userId','name image resume')
     .populate('jobId','title location category level salary')
     .exec()
     return res.json({success:true,applications})

  }catch(error){
      res.json({success:false,message:error.message})
  }
}

//Get Companty posted jobs
export const getCompanyPostedJobs = async (req, res) => {

     try{
        const companyId=req.company._id
        const jobs=await Job.find({companyId})
        

        //(todo) adding No.of applicants info in data
         const jobsData=await Promise.all(jobs.map(async (job)=>{
          const applicants=await JobApplication.find({jobId:job._id});
          return {...job.toObject(),applicants:applicants.length}
         }))
         res.json({success:true,jobsData: jobsData})
     }catch(error){
          res.json({success:false,message:error.message})
     }


}

// Change Job Application status
export const changeJobApplicationStatus = async (req, res) => {
  try{
         const {id,status}=req.body
        //find job application and update status
        await JobApplication.findOneAndUpdate({_id:id},{status})
         res.json({success:true,message:'status changed'})
  }catch(error){
         res.json({success:false,message:error.message})
  }
   


}

//Change job visibility
export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    if (!id) {
      return res.json({ success: false, message: "Job ID is required" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
      await job.save(); // don't forget to save the change
      return res.json({ success: true, message: "Job visibility updated", visible: job.visible });
    } else {
      return res.json({ success: false, message: "Unauthorized to update this job" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
