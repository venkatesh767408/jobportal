import express from 'express';
import { applyforJob, getUserData, getUserjobApplications, updateuserResume } from '../Controller/userController.js';
import upload from '../config/multer.js';

const router=express.Router();

//get user data
router.get('/user', getUserData)

//apply for a job
router.post('/apply',applyforJob)

//apply for a job
router.get('/applications',getUserjobApplications)

// update user profile
 router.post('/update-resume',upload.single('file'),updateuserResume)

 export default router
