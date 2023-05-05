const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, } =req.body;

   const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt :Date.now(),
    user : req.user._id,
   })   
   res.status(200).json({
    success : true,
    order,
   })
})

// get single orders
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order)
    {
        return next(new ErrorHandler("Order not found",404))
    }
  res.status(200).json({
    success :true,
    order,
  })
})
 // get logged in user's order
exports.myOrders = catchAsyncError(async(req,res,next)=>{

    const orders = await Order.find({user:req.user._id})
    
    // if(!order)
    // {
    //     return next(new ErrorHandler("Order not found",404))
    // }
  res.status(200).json({
    success :true,
    orders,
  })
})

//get all orders for admin
exports.getAllOrder = catchAsyncError(async(req,res,next)=>{

    const orders = await Order.find()
    // .populate("user","name email")
   let totalAmount=0;
   orders.forEach(order=>{
    totalAmount+=order.totalPrice;
   })
  res.status(200).json({
    success :true,
    totalAmount,
    orders,
  })
})


//update Order status for admin
exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id)
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this Id",404))
    }
   if(order.orderStatus==="Delivered")
   {
    return next(new ErrorHandler("You Have Already Delivered The Product",400))
   }
  if(req.body.status==="Shipped"){
    order.orderItems.forEach(async(i)=>{
      await updateStock(i.product,i.quantity) ;
   })
  }
  order.orderStatus=req.body.status;
  if(req.body.status==="Delivered")
  {
    order.deliveredAt=Date.now();
  }
  await order.save({validateBeforeSave : false})
  res.status(200).json({
    success :true,
  })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);
    product.Stock-=quantity;
   await  product.save({validateBeforeSave :false});
}

//delete order for admin
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findByIdAndRemove(req.params.id)

      if(!order)
    {
        return next(new ErrorHandler("Order not found",404))
    }
  
  res.status(200).json({
    success :true,
  })
})