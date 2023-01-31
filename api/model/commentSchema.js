import mongoose from 'mongoose';



const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
        },
    post:{type:mongoose.Types.ObjectId,
        ref:'posts',
        required:true
        },
        text:String
 
},
{
  timestamps:true,
}
);


const commentmodel = mongoose.model("comments",commentSchema )
export default commentmodel