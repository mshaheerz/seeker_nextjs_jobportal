import mongoose from 'mongoose';



const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
        },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'posts',
        required:true
        },
 
},
{
  timestamps:true,
}
);


const likemodel = mongoose.model("likes",likeSchema )
export default likemodel