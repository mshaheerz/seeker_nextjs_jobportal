import usermodel from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import postmodel from "../model/postSchema.js";
import commentmodel from "../model/commentSchema.js";
import likemodel from "../model/likeSchema.js";
import jobmodel from "../model/jobSchema.js";

export async function validateSignup(req,res){
    try {
        let obj = req.body
        let regName =/^[a-zA-Z]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let mob=/^([+]\d{2})?\d{10}$/
        if(obj.firstname && obj.lastname && obj.email && obj.password && obj.cpassword){
            if (regName.test(obj.firstname.toString())) {
                if (regName.test(obj.lastname.toString())) {
               
                  if (regEmail.test(obj.email.toString())) {
                   
                    if (obj.password === obj.cpassword) {
                 
                      if (mob.test(obj.phone.toString())) {
                     
                       
                        let user = await usermodel.findOne({email:obj.email})
                        if(!user){
                            let usertwo = await usermodel.findOne({phone:obj.phone})
                            if(!usertwo){

                                res.json({ "status": "success", "message": "approved" })
                                



                            }else{
                                res.json({ "status": "failed", "message": "Phone number already registered" })
                            }
                        }else{
                            res.json({ "status": "failed", "message": "Email already registered" })
                        }
        
                     
                      } else {
                        res.json({ "status": "failed", "message": "Enter valid Phone number" })
                      }
                    } else {
                        res.json({ "status": "failed", "message": "password and confirm password error" })
                    }
                  } else {
                    res.json({ "status": "failed", "message": "Enter valid Email" })
                  }
                } else {
                    res.json({ "status": "failed", "message": "Enter valid lastname" })
                }
              } else {
                res.json({ "status": "failed", "message": "Enter valid firstname" })
            }
        }else{
            // res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })
            res.json({ "status": "failed", "message": "All fields are required" })
        }
        
       
    } catch (error) {
      res.json({ "status": "failed", "message": error.message })
    }
}


export async function signup(req,res){
  try {
    let obj = req.body
    let regName =/^[a-zA-Z]+$/;
    let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let mob=/^([+]\d{2})?\d{10}$/
    if(obj.firstname && obj.lastname && obj.email && obj.password && obj.cpassword){
        if (regName.test(obj.firstname.toString())) {
            if (regName.test(obj.lastname.toString())) {
           
              if (regEmail.test(obj.email.toString())) {
               
                if (obj.password === obj.cpassword) {
             
                  if (mob.test(obj.phone.toString())) {
                 
                   
                    let user = await usermodel.findOne({email:obj.email})
                    if(!user){
                        let usertwo = await usermodel.findOne({phone:obj.phone})
                        if(!usertwo){
                          try {
                      
                             await obj.otpverify.confirm(obj.otp)
                            
                          } catch (error) {
                              console.log(error)
                          }
                         
                            const salt = await bcrypt.genSalt(10);
                            const hashPassword = await bcrypt.hash(obj.password.trim(),salt)
                            await usermodel.create({
                              firstname:obj.firstname,
                              lastname:obj.lastname,
                              email:obj.email,
                              employertype:obj.employertype,
                              password:hashPassword,
                              phone:obj.phone,
                              recentcompany:obj.recentcompany,
                              recentjob:obj.recentjob,
                              school:obj.school,
                              resume:obj.resume,
                              state:obj.state,
                              zip:obj.zip,
                              city:obj.city,
                              address:obj.address

                            })

                            let userdetails=await usermodel.findOne({email:obj.email})
                            let userId = userdetails._id;
                        
                          
                            const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{ expiresIn:'24h' })
                            res.json({ "status": "success", "message": "signup success",token:token })
                            



                        }else{
                            res.json({ "status": "failed", "message": "Phone number already registered" })
                        }
                    }else{
                        res.json({ "status": "failed", "message": "Email already registered" })
                    }
    
                 
                  } else {
                    res.json({ "status": "failed", "message": "Enter valid Phone number" })
                  }
                } else {
                    res.json({ "status": "failed", "message": "password and confirm password error" })
                }
              } else {
                res.json({ "status": "failed", "message": "Enter valid Email" })
              }
            } else {
                res.json({ "status": "failed", "message": "Enter valid lastname" })
            }
          } else {
            res.json({ "status": "failed", "message": "Enter valid firstname" })
        }
    }else{
        // res.json({"auth":true,"token":token,"result":admindetails, "status": "success", "message": "signin success" })
        res.json({ "status": "failed", "message": "All fields are required" })
    }
    
   
} catch (error) {
  res.json({ "status": "failed", "message": error.message })
}
   
}




export async function signin(req,res){
  try {
    let obj = req.body
    let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(obj.email && obj.password){
      if(regEmail.test(obj.email.toString())){
        let user = await usermodel.findOne({email:obj.email})
        if(user){
          const isMatch = await bcrypt.compare(obj.password,user.password)
          if(isMatch){
            const userId= user._id
            const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
            res.json({ "status": "success", "message": "signin success",token:token })
          }else{
            res.json({ "status": "failed", "message": "Password is incorrect" })

          }
        }else{
          res.json({ "status": "failed", "message": "Email not registered" })

        }
      }else{
        res.json({ "status": "failed", "message": "Enter valid email" })

      }
    }else{
      res.json({ "status": "failed", "message": "All fields are required" })

    }
    
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })

  }
}




export async function isUserAuth (req, res) {
  try {

  let userDetails = await usermodel.findById(req.userId)

  res.json({
      "userId": userDetails._id,
      "firstname":userDetails.firstname,
      "lastname":userDetails.lastname,
      "recentjob":userDetails.recentjob,
      "email":userDetails.email,
      "auth":true,
      "image":userDetails.image||null
  })
  
  } catch (error) {
      res.json({"status":"failed", "message":error.message})
  }
  

}

export async function userPost(req,res){
  try {
    let obj = req.body
    if(obj.image || obj.text || obj.video){
      await postmodel.create({
      user:req.userId,
      text:obj.text || null,
      image:obj.image || null,
      googleid:obj.googleid,
      video:obj.video || null
    })

    res.json({ "status": "success", "message": "Post added successfully" })
    }else{
      res.json({"status":"failed", "message":"something went wrong"})
    }

  } catch (error) {
     res.json({"status":"failed", "message":error.message})
  }
}


export async function userPostUpdate(req,res){
  try {
    let obj = req.body
    if(obj.image || obj.text || obj.video){
      await postmodel.updateOne({googleid:obj.googleid},{
      user:req.userId,
      text:obj.text || null,
      image:obj.image || null,
      video:obj.video || null
    })

    res.json({ "status": "success", "message": "Post added successfully" })
    }else{
      res.json({"status":"failed", "message":"something went wrong"})
    }

  } catch (error) {
     res.json({"status":"failed", "message":error.message})
  }
}


export async function getposts(req,res){
  try {

    let posts = await postmodel.find({}).populate("user").sort({updatedAt:-1})
  
    
    res.json({"status":"success","posts":posts})
  } catch (error) {
 
    res.json({"status":"failed", "message":error.message})
  }
}

export async function deletePost(req,res){
  try {
    const postId = req.params.id
    if(postId){
      await postmodel.findByIdAndDelete(postId)
      res.json({"status":"success", "message":'post deleted successfully'})
    }else{
      res.json({"status":"failed", "message":'something went wrong'})
    }

  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}


export async function fetchComments(req,res){
  try {
    const postId = req.params.postId
   const comments =  await commentmodel.find({post:postId}).populate("user")
   
    res.json({"status":"success", "message":"message fetched successfylly", comments})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}

export async function addcomment(req,res){
  try {
    const {text,user,post} = req.body
    await commentmodel.create({text,user,post})
    res.json({"status":"success","message":'comment added success'})
  } catch (error) {
 
    res.json({"status":"failed", "message":error.message})
  }
}


export async function fetchLikes(req,res){
  try {
    console.log(req.params)
   const likes =  await likemodel.find({post:req.params.postId})
    res.json({"status":"success", "message":"message fetched successfully", likes})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}


export async function deleteLikes(req,res){
  try {
    const userId= req.params.userId;
    const postId= req.params.postId;
  await likemodel.findOneAndDelete({user:userId,post:postId})
   
    res.json({"status":"success", "message":"unliked success fully"})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}


export async function addLikes(req,res){
  try {
   const {userId,postId}=req.body
 
  await likemodel.create({user:userId,post:postId})
   
    res.json({"status":"success", "message":"like added successfully"})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}




export async function getOneposts(req,res){
  try {
    const {postId}= req.body
    let posts = await postmodel.findById(postId).populate("user")
  
    
    res.json({"status":"success","posts":posts})
  } catch (error) {
 
    res.json({"status":"failed", "message":error.message})
  }
}


export async function getAllposts(req,res){
  try {
    const jobs = await jobmodel.find({}).populate('company')
    res.json({"status":"success",jobs:jobs})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}


export async function getOnePostNoAuth(req,res){
  try {
    const jobId = req.params.jobId
    const jobs = await jobmodel.findById(jobId).populate('company')
    res.json({"status":"success",jobs:jobs})
  } catch (error) {
    res.json({"status":"failed", "message":error.message})
  }
}


