import express from "express";
const router = express.Router()
import {verifyJWT} from '../middlewares/auth.js'
import {getProfilePosts,applyJob,getOnePostNoAuth,addcomment,getOneposts,addLikes,deleteLikes,fetchLikes,fetchComments, deletePost,userPostUpdate,getposts,userPost,signup,signin ,validateSignup,isUserAuth, getAllposts} from "../controller/userController.js";


router.post('/signup',signup)
router.get('/isUserAuth',verifyJWT,isUserAuth)
router.post('/validate_signup',validateSignup)
router.post('/signin',signin)
router.post('/userpost',verifyJWT,userPost)
router.post('/userpostupdate',verifyJWT,userPostUpdate)
router.post('/getposts',verifyJWT,getposts)
router.delete('/delete_post/:id',deletePost)
router.get('/fetch_comments/:postId',verifyJWT, fetchComments)
router.get('/fetch_commentsNoAuth/:postId', fetchComments)
router.get('/fetch_likes/:postId',verifyJWT,fetchLikes)
router.delete('/delete_likes/:userId/:postId',deleteLikes)
router.post('/add_likes',addLikes)
router.post('/getOnepost',verifyJWT,getOneposts)
router.post('/send_post',verifyJWT,addcomment)
router.post('/getOnepostNoAuth',getOneposts)
router.get('/get_allposts',verifyJWT,getAllposts)
router.get('/get_onejobNoAuth/:jobId',getOnePostNoAuth)
router.post('/ApplyJob',verifyJWT,applyJob)
router.get('/get_profile_posts',verifyJWT,getProfilePosts)


export default router