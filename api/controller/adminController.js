import usermodel from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import postmodel from "../model/postSchema.js";
import commentmodel from "../model/commentSchema.js";
import likemodel from "../model/likeSchema.js";
import jobmodel from "../model/jobSchema.js";
import adminmodel from "../model/adminSchema.js";
import jobapplymodel from "../model/jobapplySchema.js";
import companymodel from "../model/company/companySchema.js";
import reportmodel from "../model/reportSchema.js";
export async function AdminSignin(req,res){
    try {
      let obj = req.body
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(obj.email && obj.password){
        if(regEmail.test(obj.email.toString())){
          let admin = await adminmodel.findOne({email:obj.email})
        //   const salt = await bcrypt.genSalt(10);
        //   const hashPassword = await bcrypt.hash(obj.password.trim(),salt)
        //   await adminmodel.create({email:obj.email,password:hashPassword})
          if(admin){
            const isMatch = await bcrypt.compare(obj.password,admin.password)
            if(isMatch){
       
              const adminId= admin._id
              const token = jwt.sign({adminId},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})
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

  export async function isAdminAuth (req, res) {
    try {
  
    let adminDetails = await adminmodel.findById(req.adminId)
        
    res.json({
        "email":adminDetails.email,
        "auth":true,
        "image":adminDetails.image||null
    })
    
    } catch (error) {
        res.json({"status":"failed", "message":error.message})
    }
    
  
  }
  

  export async function  get_all_counts(req,res){
    try {
      const usercount = await usermodel.countDocuments({})
      const companycount = await companymodel.countDocuments({});
      const jobsCount = await jobmodel.countDocuments({});
      const counts ={
        usercount,
        companycount,
        jobsCount

      }
    
      res.json({"status":"success","message":"data fetched successfully",counts })
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }

  export async function  getAllUserDetails(req,res){
    try {
      const users = await usermodel.find({}).sort({updatedAt:-1})
     
    
      res.json({"status":"success","message":"data fetched successfully",users })
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }

  export async function  flagUser(req,res){
    try {
      const {isBanned} = req.body
      const id = req.params.id
      await usermodel.findByIdAndUpdate(id,{isBanned})
     
    
      res.json({"status":"success","message":"status updated success",id,isBanned})
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }


  export async function  getNotAprovedJobs(req,res){
    try {
      const jobs = await jobmodel.find({approved:false}).populate("company").sort({updatedAt:-1})
     
    
      res.json({"status":"success","message":"data fetched successfully",jobs })
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }

  export async function  approveJob(req,res){
    try {
      const {approve} = req.body
      const id = req.params.id
      await jobmodel.findByIdAndUpdate(id,{approved:approve})

    
      res.json({"status":"success","message":"status updated success",id,approve})
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }

  export async function  getAllCompanyDetails(req,res){
    try {
      const company = await companymodel.find({}).sort({updatedAt:-1})
      res.json({"status":"success","message":"data fetched successfully",company })
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }

  export async function  getAllJobDetails(req,res){
    try {
      const job = await jobmodel.find({}).populate("company").sort({updatedAt:-1})
      res.json({"status":"success","message":"data fetched successfully",job })
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }



  export async function  flagCompany(req,res){
    try {
      const {isBanned} = req.body
      const id = req.params.id
      await companymodel.findByIdAndUpdate(id,{isBanned})
     
    
      res.json({"status":"success","message":"status updated success",id,isBanned})
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }


  
  export async function  flagJob(req,res){
    try {
      const {isBanned,approved} = req.body
      const id = req.params.id
      console.log(isBanned, approved)
      
      await jobmodel.findByIdAndUpdate(id,{isBanned,approved})
     
    
      res.json({"status":"success","message":"status updated success",id,isBanned})
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }


  

  export async function  getAllReports(req,res){
    try {
      const reports  = await reportmodel.find({}).populate("post")
      res.json({"status":"success","message":"status updated success",reports})
    } catch (error) {
      res.json({"status":"failed", "message":error.message})
    }
  }
