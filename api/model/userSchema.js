import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    firstname:{type: String, required: true, trim:true},
    lastname:{type: String,required: true, trim:true},
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
  city:String,
  state:String,
  zip:Number,
  recentjob:String,
  recentcompany:String,
  employertype:String,
  school:String,
  resume:String,
  image:String,
  cover:String,
  phone:{
    type: String,
  },
  password: {
    type: String,
    trim:true,
    required: true,
    minlength: [6],
  },
  isBanned:{type:Boolean, default:false},
  
 
},
{
  timestamps:true,
}
);


const usermodel = mongoose.model("user",userSchema )
export default usermodel