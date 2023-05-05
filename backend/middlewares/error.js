const ErrorHandler = require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.message  = err.message || "Internal Server Error"

      // wrong mongodb id error

    if(err.name==="CastError"){
      const message =`Resource not Found : ${err.path}`;
      err= new ErrorHandler(message,400);
    }

    //mongo dublicate key error
    if(err.code===11000){
      const message =`Duplicate  ${Object.keys(err.keyValue)}`;
      err= new ErrorHandler(message,400);
    }

     //JWTerror
     if(err.name==="jsonwebTokenError"){
      const message =`json webtoken is Invalid Try Again`;
      err= new ErrorHandler(message,400);
    }

     //JWT EXPIRE error
     if(err.name==="TokenExpiredError"){
      const message =`json webtoken is Expired Try Again`;
      err= new ErrorHandler(message,400);
    }
     res.status(err.statusCode).json({
        success : false,
       message : err.message  
     })
}