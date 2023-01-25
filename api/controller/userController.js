import usermodel from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

                            let userdetails= usermodel.findOne({email:obj.email})
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