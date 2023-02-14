import mongoose from 'mongoose';



const UserJobAppliedSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
        },
    job:{
        type:mongoose.Types.ObjectId,
        ref:'jobs',
        required:true
        },
    company:{                   
        type:mongoose.Types.ObjectId,
        ref:'company',
        required:true
        }, 
        
},
{
  timestamps:true,
}
);


const userjobapplymodel = mongoose.model("userjobapplied",UserJobAppliedSchema )
export default userjobapplymodel