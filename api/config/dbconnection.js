import mongoose from 'mongoose';


const connectDb = async (DATABASE_URL) => {
    
    mongoose.set("strictQuery", false);
        try{
            const DB_OPTIONS ={dbName:'seeker'}
            await mongoose.connect(DATABASE_URL,DB_OPTIONS )
            console.log('connected successfully..');
        }catch(error){
    
            console.log(error);
        }
    }

export default connectDb