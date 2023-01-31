
import  jwt  from "jsonwebtoken"


export async function verifyJWT(req,res,next){
    try {
    const token = req.headers["usertoken"]
    console.log(req.body)
    if(!token){
        console.log('not token')
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        console.log(' token')
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                console.log('token error')
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
                console.log('worked')
            console.log(decoded)
            req.userId = decoded.userId
            next();
            }
        })
    }
    } catch (error) {
        res.json({auth:false,status:"failed",message:error.message})
    }
   
}



export async function adminJwt(req,res,next){
    const token = req.headers["x-access-admintoken"]
   
    if(!token){
        res.send({ "status": "failed", "message": "You need token" })

    } else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
          
            if(err){
                console.log(err)
                res.json({auth:false,status:"failed",message:"failed to authenticate"})
            }else{
            
            req.adminId =decoded.adminID
                next();
            }
        })
    }
}