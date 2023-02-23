import express from 'express';
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRouter from './routes/user.js';
import connectDb from './config/dbconnection.js'
import companyRouter from './routes/company.js';
import adminRouter from './routes/admin.js'
import chatRouter from './routes/chatRoute.js'
import messageRouter from './routes/messageRoute.js'
//variables
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const app = express();
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
connectDb(DATABASE_URL)


//middlewares
app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials:true,
}))
app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json({extended: false, limit: '50mb'}));
app.use(express.static("public"))
app.use(cookieParser())


//routes

app.use('/',userRouter)
app.use('/company',companyRouter)
app.use('/admin',adminRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)


app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

 export default app