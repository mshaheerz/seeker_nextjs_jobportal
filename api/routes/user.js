import express from "express";
const router = express.Router()
import { companyJwt, verifyJWT } from '../middlewares/auth.js'
import { getUserNotification, deleteComment, deleteReport, getCompanyNotification, PostNotification, flagPost, getUserPosts, getOneUserNoAuth, UserSearch, FilterByJobType, JobSearch, getCompanyWiseJobs, getOneCompanyNoAuth, getAllcompanies, getAppliedJob, getOneAppliedJob, getProfilePosts, applyJob, getOnePostNoAuth, addcomment, getOneposts, addLikes, deleteLikes, fetchLikes, fetchComments, deletePost, userPostUpdate, getposts, userPost, signup, signin, validateSignup, isUserAuth, getAllposts, editUser, DeleteNotification } from "../controller/userController.js";
import { getAllUserDetails } from "../controller/adminController.js";

//get methods
router.get('/isUserAuth', verifyJWT, isUserAuth)
router.get('/fetch_comments/:postId', verifyJWT, fetchComments)
router.get('/fetch_commentsNoAuth/:postId', fetchComments)
router.get('/fetch_likes/:postId', verifyJWT, fetchLikes)
router.get('/get_allposts', verifyJWT, getAllposts)
router.get('/get_onejobNoAuth/:jobId', getOnePostNoAuth)
router.get('/get_onecompanyNoAuth/:companyId', getOneCompanyNoAuth)
router.get('/get_oneapplied_job/:jobId', verifyJWT, getOneAppliedJob)
router.get('/get_applied_job', verifyJWT, getAppliedJob)
router.get('/get_allcompanies', verifyJWT, getAllcompanies)
router.get('/get_companywise_job/:companyId', verifyJWT, getCompanyWiseJobs)
router.get('/search_job', verifyJWT, JobSearch)
router.get('/search_user', verifyJWT, UserSearch)
router.get('/filter_by_jobtype', verifyJWT, FilterByJobType)
router.get('/get_profile_posts', verifyJWT, getProfilePosts)
router.get('/get_user_posts/:userId', verifyJWT, getUserPosts)
router.get('/get_oneuser/:userId', getOneUserNoAuth)
router.get('/GetCompanynotification/:companyId', companyJwt, getCompanyNotification)
router.get('/notification/:userId', verifyJWT, getUserNotification)

//post methods
router.post('/signup', signup)
router.post('/validate_signup', validateSignup)
router.post('/signin', signin)
router.post('/userpost', verifyJWT, userPost)
router.post('/userpostupdate', verifyJWT, userPostUpdate)
router.post('/getposts', verifyJWT, getposts)
router.post('/add_likes', addLikes)
router.post('/getOnepost', verifyJWT, getOneposts)
router.post('/send_post', verifyJWT, addcomment)
router.post('/getOnepostNoAuth', getOneposts)
router.post('/ApplyJob', verifyJWT, applyJob)
router.post('/notification', PostNotification)


//put methods
router.put('/profile_edit', verifyJWT, editUser)

//patch methods
router.patch('/flagpost', verifyJWT, flagPost)



//delete methods
router.delete('/delete_post/:id', deletePost)
router.delete('/report/:id', deleteReport)
router.delete('/delete_likes/:userId/:postId', deleteLikes)
router.delete('/comment/:commentId', verifyJWT, deleteComment)
router.delete('/notification/:notificationId', DeleteNotification)










export default router