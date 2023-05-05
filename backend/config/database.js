const mongoose = require("mongoose")

const connectDB =()=>{
    mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology : true}).then((data)=>{
        console.log(`Database is connected with ${data.connection.host}`)
    })

    }
module.exports = connectDB
