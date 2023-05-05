const express =require("express")
const errorMiddleware = require("./middlewares/error")
const app=express();
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser")
const bodyParser =require("body-parser")
const fileUpload=require("express-fileupload")
const path = require("path")

dotenv.config({
    path : "backend/config/config.env"
})

//imprting router
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
const product =require("./routes/productRoute")
const user= require("./routes/userRoutes")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for ERROR
app.use(errorMiddleware);
module.exports = app;