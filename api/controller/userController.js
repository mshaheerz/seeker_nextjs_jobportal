import usermodel from "../model/userSchema.js";


export function validateSignup(req,res){
    try {
        let obj = req.body
        let regName =/^[a-zA-Z]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        let mob=/^([+]\d{2})?\d{10}$/
        if(obj.firstname && obj.lastname && obj.email && obj.password && obj.cpassword){

        }else{
            
        }
        
        res.json(obj);
    } catch (error) {
        
    }
}


export function signup(req,res){
    try {
        let obj = req.body
        console.log(obj)
        res.json(obj) 
    } catch (error) {
        res.json({'name':'test'}) 
    }
   
}