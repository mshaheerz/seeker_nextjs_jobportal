import express from "express";
const router = express.Router()
import {verifyJWT} from '../middlewares/auth.js'
import {getOneposts,addLikes,deleteLikes,fetchLikes,fetchComments, deletePost,userPostUpdate,getposts,userPost,signup,signin ,validateSignup,isUserAuth} from "../controller/userController.js";


router.post('/signup',signup)
router.get('/isUserAuth',verifyJWT,isUserAuth)
router.post('/validate_signup',validateSignup)
router.post('/signin',signin)
router.post('/userpost',verifyJWT,userPost)
router.post('/userpostupdate',verifyJWT,userPostUpdate)
router.post('/getposts',verifyJWT,getposts)
router.delete('/delete_post/:id',deletePost)
router.get('/fetch_comments',fetchComments)
router.get('/fetch_likes',fetchLikes)
router.delete('/delete_likes/:userId/:postId',deleteLikes)
router.post('/add_likes',addLikes)
router.post('/getOnepost',verifyJWT,getOneposts)
router.post('/send_post',verifyJWT,)
export default router