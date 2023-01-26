import express from "express";
const router = express.Router()
import {verifyJWT} from '../middlewares/auth.js'
import { signup,signin ,validateSignup,isUserAuth} from "../controller/userController.js";


router.post('/signup',signup)
router.get('/isUserAuth',verifyJWT,isUserAuth)
router.post('/validate_signup',validateSignup)
router.post('/signin',signin)
export default router