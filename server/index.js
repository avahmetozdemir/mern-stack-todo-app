import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/User.js"
import todosRouter from "./routes/Todos.js"
dotenv.config()
const app  =  express()
const port =  process.env.PORT || 3500

app.get('/',(req,res)=> {
    res.send('Hello')
})

//Middlewares

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/todos',todosRouter)


app.use((err,req,res,next)=> {
    const errorStatus = err.status || 500
    const errorMessages = err.message || 'Something went wrong!'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessages,
        stack:err.stack
    })
})

//DB Connection

const DB = process.env.DATABASE
const connect= async ()=> {
    try {
        await mongoose.connect(DB).then(()=> console.log('DB connection is successful'))

    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected',()=> {
    console.log("mongoDB disconnected!");
} )
mongoose.connection.on('connected',()=> {
    console.log("mongoDB connected!");
} )

//Listening
app.listen(port,()=> {  
    connect()
    console.log(`Server is listening on port ${port}`);
})