import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import companymodel from '../model/company/companySchema.js';
import jobmodel from '../model/jobSchema.js';
import jobapplymodel from '../model/jobapplySchema.js';
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


  export async function postJob(req,res){
    try {
      const obj = req.body
      const companyId = req.companyId
      if(obj.jobtitle && obj.address && obj.city && obj.state && obj.hirecount && obj.jobdescription){
        await jobmodel.create({
          company:companyId,
          ...obj,
        })
        res.json({ "status": "success", "message": 'Job posted successfully' })
      }else{
         res.json({ "status": "failed", "message": 'Please fill required field' })
      }
    } catch (error) {
      res.json({ "status": "failed", "message": error.message })
    }
  }



  export async function getCompanyJobs(req,res){
    try {
      const data = await jobmodel.find({company:req.companyId}).sort({updatedAt:-1})
      res.json(data)
    } catch (error) {
      
    }
  }

  
  export async function getAppliedJobs(req,res){
    try {
      const companyId = req.companyId
      const jobs = await jobapplymodel.find({company:companyId,status:'pending'}).populate('user').sort({updatedAt:-1})
      res.json({"status":"success","message":"data fetched successfully",jobs})
    } catch (error) {
      
    }
  }

  export async function  companyapprovedJob(req,res){
    try {
      console.log(req.body)
      const {approve} = req.body

      const id = req.params.id
      console.log(id)
      if(approve){
         await jobapplymodel.findByIdAndUpdate(id,{status:'approved'})
      }
      
      res.json({"status":"success","message":"status updated success",id,approve})
    } catch (error) {
      
      res.json({"status":"failed", "message":error.message})

    }
  }


  export async function getApprovedJobs(req,res){
    try {
      const companyId = req.companyId
      const jobs = await jobapplymodel.find({company:companyId,status:'approved'}).populate('user').populate('job').sort({updatedAt:-1})
      res.json({"status":"success","message":"data fetched successfully",jobs})
    } catch (error) {
      
    }
  }

  export async function editJob(req,res){
    try {
      const obj = req.body
      
      const jobId = req.params.jobId
      const companyId = req.companyId
      console.log(jobId)
      if(obj.jobtitle && obj.address && obj.city && obj.state && obj.hirecount && obj.jobdescription){
        await jobmodel.findByIdAndUpdate(jobId,{
          company:companyId,
          ...obj,
        })
       
        res.json({ "status": "success", "message": 'Job posted successfully' })
      }else{
         res.json({ "status": "failed", "message": 'Please fill required field' })
      }
    } catch (error) {
      res.json({ "status": "failed", "message": error.message })
    }
  }


  export async function  JobInactiveAndActive(req,res){
    try {

      const jobId =req.params.jobId
      const {status} = req.body
       console.log(status)
      if(status == 'true'){
        console.log('jeeeeee')
         await jobmodel.findByIdAndUpdate(jobId,{active:true})
         res.json({"status":"success","message":"status updated success",jobId,statuses:status})

      }else{
        console.log('eee')
        console.log(status)
        await jobmodel.findByIdAndUpdate(jobId,{active:false})
        res.json({"status":"success","message":"status updated success",jobId,statuses:status})


      }
      
    } catch (error) {
      
      res.json({"status":"failed", "message":error.message})

    }
  }

  export async function editCompanyProfile(req,res){
    try {
      let obj = req.body
      console.log(obj)
      let regName =/^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      const currentCompany= await companymodel.findById(req.companyId)
      if(obj.fullname && obj.company && obj.email){
          if (regName.test(obj.company.toString())) {
              if (regName.test(obj.fullname.toString())) {
                if (regEmail.test(obj.email.toString())) {
  
               
                      if(currentCompany.email === obj.email){
                        if(obj.image){
                          await companymodel.findByIdAndUpdate(req.companyId,{image:obj.image})
                        }
                        if(obj.cover){
                          await companymodel.findByIdAndUpdate(req.companyId,{cover:obj.cover})
                        }
                      
                        
                        await companymodel.findByIdAndUpdate(req.companyId,{  
                          fullname:obj.fullname,
                          company:obj.company,
                          employeeCount:obj.employeeCount,
                          industry:obj.industry,
                          description:obj.description,
                           })
                           const companyDetails = await companymodel.findById(req.companyId)
                           res.json({ "status": "success", "message": "updated without email","company":companyDetails })
  
                      }else{
                        const  company= await companymodel.findOne({email:obj.email})
                        if(!company){
                            if(obj.image){
                              await companymodel.findByIdAndUpdate(req.companyId,{image:obj.image})
                            }
                            if(obj.cover){
                              await companymodel.findByIdAndUpdate(req.companyId,{cover:obj.cover})
                            }
                          
                            
                            await companymodel.findByIdAndUpdate(req.userId,{  
                        
                              email:obj.email,
                              fullname:obj.fullname,
                              company:obj.company,
                              employeeCount:obj.employeeCount,
                              industry:obj.industry,
                              description:obj.description,
                               })
  
                               const companyDetails = await companymodel.findById(req.companyId)
                              
                               res.json({ "status": "success", "message": "updated with email","company":companyDetails})
  
  
                        }else{
                          res.json({ "status": "failed", "message": "This email is already registered" })
  
                        }
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


  export async function DeleteApplyJob(req, res) {
    try {
      const jobId = req.params.jobId
       await jobapplymodel.findByIdAndDelete(jobId)
      res.json({ "status": "success", "message": "deleted successfully" })
    } catch (error) {
      res.json({ "status": "failed", "message": error.message })
    }
  }