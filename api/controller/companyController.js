import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import companymodel from '../model/company/companySchema.js';

export async function Companysignup(req,res){
    try {
      let obj = req.body
      let regName =/^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let mob=/^([+]\d{2})?\d{10}$/
      if (
        obj.fullname &&
        obj.employeeCount &&
        obj.hiringManager &&
        obj.industry &&
        obj.description &&
        obj.company &&
        obj.email &&
        obj.phone &&
        obj.password &&
        obj.cpassword
      ) {
        let regName = /^[a-zA-Z]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let mob = /^([+]\d{2})?\d{10}$/;
          if(regName.test(obj.fullname.toString())){
       
              if(regName.test(obj.company.toString())){
             
  
                  if(regEmail.test(obj.email.toString())){
            
  
                      if(mob.test(obj.phone.toString())){
                     
                          if(obj.password === obj.cpassword){
                            const salt = await bcrypt.genSalt(10);
                            const hashPassword = await bcrypt.hash(obj.password.trim(),salt)
                            // something
                            await companymodel.create({
                                fullname:obj.fullname,
                                company:obj.company,
                                email:obj.email,
                                password:hashPassword,
                                employeeCount:parseInt(obj.employeeCount),
                                hiringManager:obj.hiringManager,
                                industry:obj.industry,
                                phone:obj.phone,
                                description:obj.description,
                            })
                            let companyDetails = await companymodel.findOne({email:obj.email})
                            let companyId =  companyDetails._id

                            const token = jwt.sign({companyId}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'})
                            res.json({ "status": "success", "message": "signup success",token:token })
                          }else{
                            res.json({ "status": "failed", "message": "password and confirm password error" })
                          }
                      }else{
                        res.json({ "status": "failed", "message": "Enter valid Phone number" })
                      }
                  }else{
                    res.json({ "status": "failed", "message": "Enter valid Email" })
                  }
  
  
              }else{
                res.json({ "status": "failed", "message": "conmpany does not contain characters" })
              }
          }else{
            res.json({ "status": "failed", "message": "Enter valid name" })
          }
        
      } else {
        res.json({ "status": "failed", "message": "All fields are required" })
      }
        
        
     
  } catch (error) {
    res.json({ "status": "failed", "message": error.message })
  }
     
  }



  export async function isCompanyAuth (req, res) {
    try {
  
    let companyDetails = await companymodel.findById(req.companyId)
    console.log(companyDetails)
    let obj={
      ...companyDetails,
      auth:true
    }
    res.json(obj)
    
    } catch (error) {
        res.json({"status":"failed", "message":error.message})
    }
    
  
  }



  export async function companySignin(req,res){
    try {
      let obj = req.body
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(obj.email && obj.password){
        if(regEmail.test(obj.email.toString())){
          let company = await companymodel.findOne({email:obj.email})
          if(company){
            const isMatch = await bcrypt.compare(obj.password,company.password)
            if(isMatch){
              const companyId= company._id
              const token = jwt.sign({companyId},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
              res.json({ "status": "success", "message": "company signin success",token:token })
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