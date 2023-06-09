const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")
const cloudinary=require("cloudinary")
//create product --admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
   
   let images=[];
   if(typeof req.body.images==="string"){
       images.push(req.body.images)
   }
   else{
      images=req.body.images
   }
const imagesLink=[];
  for(let i=0;i<images.length;i++)
  {
    const result=await cloudinary.v2.uploader.upload(images[i],{
        folder : "products",
    })
    imagesLink.push({
        public_id:result.public_id,
        url:result.secure_url,
    })
  }
    req.body.images=imagesLink;
    req.body.user=req.user.id;
    const product = await Product.create(req.body)
    res.status(200).json({
        success :true,
        product
    })
})

// get all products

exports.getAllProducts=catchAsyncError(async(req,res,next)=>{
    const resultPerPage =8;
    const productCount = await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query)
    .search().
    filter()
    .pagination(resultPerPage);  
    const products = await apiFeature.query;
    res.status(200).json({
        success :true,
        products,
        productCount,
        resultPerPage
    })
})

// get all products admin

exports.getAdminProducts=catchAsyncError(async(req,res,next)=>{
   const products=await Product.find()
    res.status(200).json({
        success :true,
        products,
       
    })
})
// get product detail

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("Product not found",404))
    }

   
    res.status(200).json({
        success :true,
        product,
      
    })
}
)

//update product --admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
        }

    // images comes here  
    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images)
    }
    else{
       images=req.body.images
    }  
    if(images!==undefined){
        for(let i=0;i<product.images.length;i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
    
    const imagesLink=[];
    for(let i=0;i<images.length;i++)
    {
      const result=await cloudinary.v2.uploader.upload(images[i],{
          folder : "products",
      })
      imagesLink.push({
          public_id:result.public_id,
          url:result.secure_url,
      })
    }
        req.body.images=imagesLink

}
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators :true,
        useFindAndModify : false
    })
    res.status(200).json({
        success :true,
        product
    })
})

//Delete product --admin
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
       
        return next(new ErrorHandler("Product not found",404))
        
    }
      for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }


    product = await Product.findByIdAndDelete(req.params.id,req.body,{
        new : true,
        runValidators :true,
        useFindAndModify : false
    })
    res.status(200).json({
        success :true,
        message : "product deleted successfully"
    })
}
)

//create new review or update review
 exports.createReview =catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment,
    }
    const product= await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=>rev.user===req.user._id)
   if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user===req.user._id)
            {
                rev.rating=rating;
                rev.comment=comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;
         product.reviews.forEach(rev=>{
        avg+=rev.rating;
       })
       product.ratings =avg/product.reviews.length;

       await product.save({validateBeforeSave : false});
       res.status(200).json({
        success :true,
       })
 })

 //to get all reviews
 exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    // const reviews=product.reviews;
    res.status(200).json({
        success :true,
      
        reviews : product.reviews,
    })

 })

 //delete review
 exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    const reviews =product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString()) ;
    let avg=0;
    reviews.forEach(rev=>{
   avg+=rev.rating;
  })
  const ratings =avg/reviews.length;
  const numOfReviews =reviews.length;
  const data={
   
    ratings,
    numOfReviews,
    reviews,
  };
  await Product.findByIdAndUpdate(req.query.productId,data,{
    new : true,
    runValidators :true,
    useFindAndModify : false,
  })
    res.status(200).json({
        success :true,
       
    })

 })
