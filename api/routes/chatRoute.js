import express from "express";
const router = express.Router()

import { getchatUser,createChat,userChats,findChat } from "../controller/chatController.js";
router.post('/',createChat)
router.get('/:userId',userChats ) //userChats
router.get('/find/:firstId/:secondId', findChat) //findChat
router.get('/getchatusers/:userId',getchatUser)
export default router