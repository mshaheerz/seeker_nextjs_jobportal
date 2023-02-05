import express from "express";
const router = express.Router()
import {verifyJWT,companyJwt} from '../middlewares/auth.js'
import {getCompanyJobs,postJob,isCompanyAuth,Companysignup,companySignin} from "../controller/companyController.js"

router.post('/signup',Companysignup)
router.post('/signin',companySignin)


//protected routes
router.get('/isCompanyAuth',companyJwt,isCompanyAuth)
router.post('/postjob',companyJwt,postJob)
router.post('/get_company_jobs',companyJwt,getCompanyJobs)

export default router