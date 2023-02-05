import mongoose from 'mongoose';



const jobSchema = new mongoose.Schema({
    company:{
        type:mongoose.Types.ObjectId,
        ref:'company',
        required:true
        },
    jobtitle:String,
    address:String,
    amount:{type: String,},
    city:{type: String},
    hirecount:Number,
    jobdescription:String,
    jobtype:Array,
    schedule:Array,
    state:String,
    suplimentalpay:Array,
    zip:Number,
    isBanned:{type:Boolean, default:false},
  
 
},
{
  timestamps:true,
}
);


const jobmodel = mongoose.model("jobs",jobSchema )
export default jobmodel