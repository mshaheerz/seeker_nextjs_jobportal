
import  jwt  from "jsonwebtoken"


export async function verifyJWT(req,res,next){
    try {
    const token = req.headers["usertoken"]
   
    if(!token){
   
        res.send({ "status": "failed", "message": "You need token" })

    } else{
 
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
   
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
  
            req.userId = decoded.userId
            next();
            }
        })
    }
    } catch (error) {
        res.json({auth:false,status:"failed",message:error.message})
    }
   
}



export async function companyJwt(req,res,next){
    const token = req.headers["companytoken"]
   
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
          
            if(err){
             
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            
            req.companyId =decoded.companyId
                next();
            }
        })
    }
}

export async function adminJwt(req,res,next){
    const token = req.headers["admintoken"]
   
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
          
            if(err){
              
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            
            req.adminId =decoded.adminId
                next();
            }
        })
    }
}