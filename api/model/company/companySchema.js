import mongoose from 'mongoose';



const companySchema = new mongoose.Schema({
    fullname:{type: String, required: true, trim:true},
    company:{type: String,required: true, trim:true},
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
  industry:String,
  description:String,
  employeeCount:Number,
  hiringManager:String,
  image:String,
  cover:String,
  phone:{
    type: String,
  },
  password: {
    type: String,
    trim:true,
    required: true,
  },
  isBanned:{type:Boolean, default:false},
  
 
},
{
  timestamps:true,
}
);


const companymodel = mongoose.model("company",companySchema )
export default companymodel