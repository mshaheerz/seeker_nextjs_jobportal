import chatmodel from "../model/chatSchema.js";
import companymodel from "../model/company/companySchema.js";
import usermodel from "../model/userSchema.js";

export const createChat = async(req, res)=>{
    try {
      const chats = await chatmodel.findOne({members:{$all:[req.body.senderId, req.body.receiverId]}})
      console.log(chats)
      if(!chats){
        const newChat = new chatmodel({
            members: [req.body.senderId, req.body.receiverId]
        })
         console.log(req.body.senderId, req.body.receiverId)
        const result = await newChat.save();
        res.status(200).json(result);
      }else{
        res.status(200).json({status:'success',message:'its already created'});
      }

    } catch (error) { 
        res.status(500).json({'status':'failed',message:error.message})
    }
}

export const userChats = async(req, res)=>{
    try {
      const chat = await chatmodel.find({
        members:{$in: [req.params.userId]}
      }).sort({createdAt:-1})
      res.json({status:'success',chat:chat})

    } catch (error) { 
        res.status(500).json({'status':'failed',message:error.message})
    }
}

export const findChat = async(req, res)=>{
    try {
      const chat = await chatmodel.findOne({
        members: {$all: [req.params.firstId, req.params.secondId]}
      })
      res.status(200).json(chat)

    } catch (error) { 
        res.status(500).json({'status':'failed',message:error.message})
    }
}

export const getchatUser = async(req, res)=>{
    try {
        const id = req.params.userId
      const user = await usermodel.findById(id)
    
      if(user){
        res.json({status:'success',user:user})
      }else{
        const company = await companymodel.findById(id)
        if(company){
            res.json({status:'success',user:company})
        }
      }
      

    } catch (error) { 
        res.status(500).json({'status':'failed',message:error.message})
    }
}