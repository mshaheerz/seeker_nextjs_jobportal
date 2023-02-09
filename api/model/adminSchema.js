import mongoose from 'mongoose';



const adminSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
  },
  password: {
    type: String,
    trim:true,
    required: true,
    minlength: [6],
  }
},
{
  timestamps:true,
}
);


const adminmodel = mongoose.model("admin",adminSchema )
export default adminmodel