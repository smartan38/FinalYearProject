const app = require("./app")
const dotenv=require("dotenv")
const connectDB =require("./config/database")
const cloudinary = require("cloudinary")

process.on("uncaughtException",err=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the Server due to uncaught Exception")
           
        process.exit(1)
    

})

dotenv.config({
    path : "backend/config/config.env"
})
connectDB();

//cloudinary
cloudinary.config({
    cloud_name :process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API,
    api_secret :process.env.CLOUDINARY_SECRET,
})




const server = app.listen(process.env.PORT,()=>{
    console.log(`server is connected at port : ${process.env.PORT}`)
})


//unhandle proise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the Server")
           server.close(()=>{
        process.exit(1)
    })

})