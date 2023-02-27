import mongoose from 'mongoose';



const reportSchema = new mongoose.Schema({
    post:{type:mongoose.Types.ObjectId,
        ref:'posts',
        required:true
        },
    reports:[{
        userId:{
            type:mongoose.Types.ObjectId,
            ref:'user',
        },
        report:String
        }],
   
 
},
{
  timestamps:true,
}
);


const reportmodel = mongoose.model("reports",reportSchema )
export default reportmodel