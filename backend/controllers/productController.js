import Product  from "../models/productModel.js"
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
//create product -- Admin
export const createProduct = catchAsyncErrors(async(req,res,next) =>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product})
})
//getAll products
export const getAllProducts = catchAsyncErrors(async (req,res,next) =>{
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();


    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);
    
    products = await apiFeature.query; 
    res.status(200).json({success:true,products,productsCount,resultPerPage,filteredProductsCount})
})

//Get Product Details
export const getProductDetails = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id); 
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        product,
        
    })

})

//update product --Admin
export const updateProduct = catchAsyncErrors(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"

        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

    res.status(200).json({
        success:true,
        product
    })

})

//Delete Product 
export const deleteProduct = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.params.id); 
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"

        })
    }
    await product.remove();
    res.status(200).json({success:true,
        message:"Product deleted successfully"})
}

)
//Create New Review or Update the review
export const createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const{rating,comment,productId}=req.body
   const review = {
    user:req.user._id,
    name:req.user.name,
    rating: Number(rating),
    comment,
  
   }
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    if (isReviewed) {
      product.reviews.forEach(rev => {
        if(rev.user.toString() === req.user._id.toString()){
  
          (rev.rating = rating),
          (rev.comment=comment)
          
        }
        
      });
    } else{
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length
  
    }
      let avg =0;
      product.reviews.forEach(rev=>{
        avg+=rev.rating
    })
    product.ratings = avg / product.reviews.length
    
       await product.save({validateBeforeSave:false})
  
       res.status(200).json({
        success:true
       })
   
     })
     

     //get all reviews of a single product
     export const getProductReviews = catchAsyncErrors(async(req,res,next)=>{

        const product = await Product.findById(req.query.id); 
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews
        })
    
    })

    //delete review of a single product
    export const deleteProductReviews = catchAsyncErrors(async(req,res,next)=>{

        const product = await Product.findById(req.query.productId); 
        if(!product){
            return next(new ErrorHandler("product not found",404))
        }
        const reviews = product.reviews.filter(rev =>rev._id.toString() !== req.query.id.toString());
        let avg =0;
        reviews.forEach(rev=>{
          avg+=rev.rating
      })
      const ratings = avg / reviews.length

      const numOfReviews = reviews.length
      await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,ratings,numOfReviews
        },
        {
            new: true,
            runValidators:true,
            useFindAndModify:false
        }
      )
      
        res.status(200).json({
            success:true,
            reviews:product.reviews
        })
    
    })