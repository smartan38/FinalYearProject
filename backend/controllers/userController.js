const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail =require("../utils/sendEmail.js")
const crypto =require("crypto");
const cloudinary=require("cloudinary")
const Contact=require("../models/contactModel")

exports.placeContact = catchAsyncError(async(req,res,next)=>{
    const{
      name,
      email,
      message,}=req.body;
    const feedback ={name, email,message,}
    await Contact.create(feedback);
    
        res.status(200).json({
          success : true,
          message :"Thanks for writing to us"
      })
  }
  )

exports.registerUser = catchAsyncError(async(req,res,next)=>{
     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder : "avatars",
        width :150,
        crop:"scale",
     })
    
    const {name ,email,password ,}= req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : myCloud.public_id,
            url : myCloud.secure_url,
        },
    })
   sendToken(user,201,res);  //its in util folder
})

//login user

exports.loginUser =catchAsyncError(async(req,res,next)=>{
    const {email,password} =req.body;

    //check if user has given email and password both
    if(!email || !password)
    {
        return next(new ErrorHandler("Please enter email and password",400))
    }
   
    const user =await User.findOne({email}).select("+password");
  
    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    
    console.log(isPasswordMatched)
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Credentials",401))
    }
  sendToken(user ,200,res); //its in util folder
     
})

//logout handler
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    res.status(200).json({
        success :true,
        message : "Logged Out"
    })
})

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user =await User.findOne({email:req.body.email})
    if(!user)
    {
        return next(new ErrorHandler("User not found",404))
    }
    //get reset password token
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave : false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message =`Your Password Reset Token is :-  \n\n ${resetPasswordUrl} \n\n If You Have Not Requested This Email Then, Olease Ignore It`
    try {
        await sendEmail({
              email :user.email,
              subject :"Ecommerce password Recovery",
              message,
        })
        res.status(200).json({
            success :true,
            message : `Email send to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken =undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave : false});
        return next(new ErrorHandler(error.message,500))
    }
})

//reset password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire :{$gt : Date.now()},
    })
    if(!user)
    {
        return next(new ErrorHandler("Reset Password Token Is Invvalid or has been Expired",400))
    }
    if(req.body.password!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Does Not match",400))
    }
    user.password=req.body.password;
    user.resetPasswordToken =undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
})

// get User Detail
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success :true,
        user,
    })
})

//up[date Password]
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched=  await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password IS Incorrect",400))
    }

    if(req.body.newPassword!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password Doen Not Match",400))
    }
      user.password=req.body.newPassword;
      await user.save();
    sendToken(user ,200,res);
})

//update profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const updatedData={
        name : req.body.name,
        email : req.body.email,
    } 

//   we will update avatar later

if(req.body.avatar!==""){
    const user=await User.findById(req.user.id);
const imageId=user.avatar.public_id;
await cloudinary.v2.uploader.destroy(imageId)

const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder : "avatars",
    width :150,
    crop:"scale",
 })
updatedData.avatar={
    public_id:myCloud.public_id,
    url:myCloud.secure_url,
}
}

const user=await User.findByIdAndUpdate(req.user.id,updatedData,{
    new :true,
    runValidators:true,
    useFindAndModify : false,
})
 res.status(200).json({
    success:true,
 })
    
})

//get all users 
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
   const users = await User.find();

   res.status(200).json({
    success:true,
    users,
 })
    } )

//get sindle users details by admin
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
   if(!user){
    return next(new ErrorHandler(`User doens not exist with id : ${req.params.id}`,400))
   }
    res.status(200).json({
     success:true,
     user,
  })
     } )


//update profile by admin
exports.updateProfileByAdmin = catchAsyncError(async(req,res,next)=>{
    const updatedData={
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
    } 

const user=await User.findByIdAndUpdate(req.user.id,updatedData,{
    new :true,
    runValidators:true,
    useFindAndModify : false,
})
await user.save();
 res.status(200).json({
    success:true,
    // user,
 })
    
})

//Delete by admin
exports.deleteUserByAdmin = catchAsyncError(async(req,res,next)=>{

const user=await User.findByIdAndRemove(req.params.id)

if(!user){
    return next(new ErrorHandler(`User doens not exist with id : ${req.params.id}`,400))
   }

   const imageId=user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(imageId)

 res.status(200).json({
    success:true,
    message : "user deleted successfully",
 })
    
})