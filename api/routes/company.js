import express from "express";
const router = express.Router()
import {verifyJWT,companyJwt} from '../middlewares/auth.js'
import {DeleteApplyJob,editCompanyProfile,JobInactiveAndActive,editJob,companyapprovedJob,getAppliedJobs,getCompanyJobs,postJob,isCompanyAuth,Companysignup,companySignin, getApprovedJobs} from "../controller/companyController.js"

router.post('/signup',Companysignup)
router.post('/signin',companySignin)


//protected routes

//get methods
router.get('/isCompanyAuth',companyJwt,isCompanyAuth)
router.get('/get_appliedjobs',companyJwt,getAppliedJobs)
router.get('/get_approvedjobs',companyJwt,getApprovedJobs)

//post methods
router.post('/postjob',companyJwt,postJob)
router.post('/get_company_jobs',companyJwt,getCompanyJobs)

//put methods
router.put('/Company_profile_edit',companyJwt,editCompanyProfile)
router.put('/editjob/:jobId',companyJwt,editJob)


//patch methods
router.patch('/approve_user/:id',companyJwt,companyapprovedJob)
router.patch('/active_inactive_job/:jobId',companyJwt,JobInactiveAndActive)

//delete methods
router.delete('/applyjob/:jobId',companyJwt,DeleteApplyJob)


export default router