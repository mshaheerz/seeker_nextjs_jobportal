import express from "express";
const router = express.Router()

import { signup ,validateSignup} from "../controller/userController.js";


router.post('/',signup)
router.post('/validate_signup',validateSignup)
export default router