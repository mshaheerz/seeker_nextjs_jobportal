import express from "express";
const router = express.Router()
import {adminJwt, verifyJWT} from '../middlewares/auth.js'
import {getOnePostNoAuth,addcomment,getOneposts,addLikes,deleteLikes,fetchLikes,fetchComments, deletePost,userPostUpdate,getposts,userPost,signup,signin ,validateSignup,isUserAuth, getAllposts} from "../controller/userController.js";

import { getAllReports,flagJob,getAllJobDetails,flagCompany,getAllCompanyDetails,approveJob,getNotAprovedJobs,flagUser,getAllUserDetails,get_all_counts,AdminSignin, isAdminAuth } from "../controller/adminController.js";

//get methods
router.get('/isAdminAuth',adminJwt,isAdminAuth)
router.get('/get_all_counts',adminJwt,get_all_counts)
router.get('/getall_user_details',adminJwt,getAllUserDetails)
router.get('/getallcompanydetails',adminJwt,getAllCompanyDetails)
router.get('/getalljobdetails', adminJwt, getAllJobDetails)
router.get('/get_notapproved_jobs',adminJwt,getNotAprovedJobs)
router.get('/report',adminJwt,getAllReports)
//post methods
router.post('/signin',AdminSignin)


//patch methods
router.patch('/flag_user/:id',adminJwt,flagUser)
router.patch('/flagcompany/:id',adminJwt,flagCompany)
router.patch('/flagjob/:id',adminJwt,flagJob)
router.patch('/approve_job/:id',adminJwt,approveJob)






export default router