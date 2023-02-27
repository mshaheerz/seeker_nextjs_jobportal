import mongoose from 'mongoose';



const NotificationSchema = new mongoose.Schema({
    authorCompany:{
        type:mongoose.Types.ObjectId,
        ref:'company',
        },
    recieverUser:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        },
    authorUser:{                   
        type:mongoose.Types.ObjectId,
        ref:'user',
        }, 
    
    recieverCompany:{                   
        type:mongoose.Types.ObjectId,
        ref:'company',
        }, 
    content:{
        type:String,
    },

    type: {
        type:String,
        default:'warning'
    },

    href:{
        type:String,
    },
            
},
{
    timestamps:true,
    capped: {
        size:1024,
        max: 1000,
        autoIndexId:true
    }
  },



);


const notificationmodel = mongoose.model("notification",NotificationSchema )
export default notificationmodel