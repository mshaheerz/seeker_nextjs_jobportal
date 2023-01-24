import express from 'express';
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRouter from './routes/user.js';
import connectDb from './config/dbconnection.js'


//variables
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const app = express();
connectDb(DATABASE_URL)


//middlewares
app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))
app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser())


//routes

app.use('/',userRouter)




app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

 export default app