import express from "express";
const router = express.Router()
import {verifyJWT,companyJwt} from '../middlewares/auth.js'
import {editJob,companyapprovedJob,getAppliedJobs,getCompanyJobs,postJob,isCompanyAuth,Companysignup,companySignin, getApprovedJobs} from "../controller/companyController.js"

router.post('/signup',Companysignup)
router.post('/signin',companySignin)


//protected routes
router.get('/isCompanyAuth',companyJwt,isCompanyAuth)
router.post('/postjob',companyJwt,postJob)
router.put('/editjob/:jobId',companyJwt,editJob)
router.post('/get_company_jobs',companyJwt,getCompanyJobs)
router.get('/get_appliedjobs',companyJwt,getAppliedJobs)
router.get('/get_approvedjobs',companyJwt,getApprovedJobs)
router.patch('/approve_user/:id',companyJwt,companyapprovedJob)

export default router