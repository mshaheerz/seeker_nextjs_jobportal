import mongoose from 'mongoose';



const postSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
        },
    googleid:String,
    image:{type: String,},
    text:{type: String},
    video:String,
    reports:[{
      userId:{
        type:mongoose.Types.ObjectId,
        ref:'user',
      },
      report:String
    }],

    
  isBanned:{type:Boolean, default:false},
  
 
},
{
  timestamps:true,
}
);


const postmodel = mongoose.model("posts",postSchema )
export default postmodel