import express from "express";
const router = express.Router()
import {verifyJWT,companyJwt} from '../middlewares/auth.js'
import {addcomment,getOneposts,addLikes,deleteLikes,fetchLikes,fetchComments, deletePost,userPostUpdate,getposts,userPost,signup,signin ,validateSignup,isUserAuth} from "../controller/userController.js";
import {isCompanyAuth,Companysignup} from "../controller/companyController.js"

router.post('/signup',Companysignup)
router.get('/isCompanyAuth',companyJwt,isCompanyAuth)

export default router