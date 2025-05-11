import express from 'express';
import { registerCompany,loginCompany, getCompanyData, postJob, getCompanyJobApplicants, getCompanyPostedJobs, changeJobApplicationStatus, changeJobVisibility } from '../Controller/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';


const router=express.Router();

//Register a company
 router.post('/register',upload.single('image'),registerCompany);

 //Company login
 router.post('/login',loginCompany);

 //Get company
 router.get('/getCompany',protectCompany,getCompanyData);

 //Post Data
  router.post('/post-job',protectCompany,postJob);

  //get Applicants data of Company

router.get('/applicants',protectCompany,getCompanyJobApplicants);

//get company job list
 router.get('/list-jobs',protectCompany,getCompanyPostedJobs);

 // change application status
 router.put('/change-status',protectCompany,changeJobApplicationStatus);

 //Change Applications visibility

 router.put('/change-visibility',protectCompany,changeJobVisibility);

 export default router;