import mongoose from 'mongoose';



const MessageSchema = new mongoose.Schema({
    chatId: {
        type: String,

    },

    senderId: {
        type: String

    },

    text: {
        type: String,
    }

},
    {
        timestamps: true,
    }
);


const messagemodel = mongoose.model("message", MessageSchema)
export default messagemodel 