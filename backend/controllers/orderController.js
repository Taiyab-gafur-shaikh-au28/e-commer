import Order from "../models/orderModel.js";
import Product  from "../models/productModel.js"
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

//create a new order
export const newOrder = catchAsyncErrors(async (req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
        
    })
    res.status(201).json({
        success:true,
        order
    })
})

//get single order
export const getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order Not Found With This id",404))
    }
    res.status(200).json({
        success:true,
        order,

    })
}) 

//get logged in user Order
export const myOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find({ user : req.user._id});

  
    res.status(200).json({
        success:true,
        orders,
        
    })
}) 

//get all orders --Admin
export const getAllOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find({ user : req.user._id});

    let totalAmount = 0
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })

  
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
        
    })
}) 

//Update Order Status  --Admin
export const updateOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not Found With this Id",404))
    }

    if(order.orderStatus ==="Delivered"){
        return next(new ErrorHandler("you have Already delivered this order",400) )
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }
    
    await order.save({validateBeforeSave : false})
  
    res.status(200).json({
        success:true,        
    })
}) 

async function updateStock(id,quantity){

    const product = await Product.findById(id);

    product.Stock -= quantity
   await product.save({validateBeforeSave:false})

}

//get all orders --Admin
export const deleteOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not Found With this Id",404))
    }

    await order.remove()

  
    res.status(200).json({
        success:true,
        
    })
}) 
