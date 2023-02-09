import express from "express";
const router = express.Router()
import {adminJwt, verifyJWT} from '../middlewares/auth.js'
import {getOnePostNoAuth,addcomment,getOneposts,addLikes,deleteLikes,fetchLikes,fetchComments, deletePost,userPostUpdate,getposts,userPost,signup,signin ,validateSignup,isUserAuth, getAllposts} from "../controller/userController.js";

import { approveJob,getNotAprovedJobs,flagUser,getAllUserDetails,get_all_counts,AdminSignin, isAdminAuth } from "../controller/adminController.js";

router.get('/isAdminAuth',adminJwt,isAdminAuth)
router.post('/signin',AdminSignin)
router.get('/get_all_counts',adminJwt,get_all_counts)
router.get('/getall_user_details',adminJwt,getAllUserDetails)
router.patch('/flag_user/:id',adminJwt,flagUser)
router.patch('/approve_job/:id',adminJwt,approveJob)
router.get('/get_notapproved_jobs',adminJwt,getNotAprovedJobs)

export default router