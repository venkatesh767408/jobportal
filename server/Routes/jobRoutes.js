import express from 'express';
import { getJobById, getJobs } from '../Controller/jobController.js';
const router=express.Router();

//Route to get all jobsdata

router.get('/',getJobs)
//Route to get single job data
router.get('/:id',getJobById)

export default router;