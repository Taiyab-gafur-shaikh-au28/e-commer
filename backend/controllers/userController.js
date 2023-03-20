import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import {sendEmail} from "../utils/sendEmail.js"
import Product from "../models/productModel.js"
import crypto from "crypto"
// import {v2 as cloudinary} from "cloudinary"


//Register a user 
export const registerUser = catchAsyncErrors(async(req,res,next)=>{

  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder:"avatars",
  //   width:150,
  //   crop:"scale",
  // })

//   :{
//     public_id:myCloud.public_id,
//     url:myCloud.secure_url,
// }
    
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });
    console.log("line printed")
    //getting jwt token
   sendToken(user,201,res)
})



//login User

export const loginUser = catchAsyncErrors(async(req,res,next)=>{

    const{email,password} = req.body;
    // checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password",401))
        }


        const isPasswordMatched = user.comparePassword(password);
        
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",401))
        }
//getting jwt token
        sendToken(user,200,res)
        


})


//loggout user

export const logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{expires:new Date(Date.now()),
        httpOnly: true,
})

    res.status(200).json({
        success:true,
        message:"Logged out Successfully"
    })

})

//Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    
    await user.save({ validateBeforeSave: false });
    
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
      )}/api/v1/password/reset/${resetToken}`;
      
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      
      try {
        await sendEmail({
          email: user.email,
          subject: `Ecommerce Password Recovery`,
          message,
        });
        
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });
        
        return next(new ErrorHandler(error.message, 500));
    }
  });
  
  //Reset Password Token
  export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{ $gt: Date.now()}
    });
    if (!user) {
      return next(new ErrorHandler("Reset Password Token Is Invalid Or Has Been Expired", 404));
    }
    if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHandler("Password Does not match", 400));

    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res)
  })

  //GET  User Details
  export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    }); 
  })

  //Update Users Password
  export const updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
        
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrrect",401))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
      return next(new ErrorHandler("Password Does Not Match",401))
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user,200,res)
    res.status(200).json({
      success: true,
      user,
    }); 

  })


  //Update Users Profile
  export const updateProfile = catchAsyncErrors(async(req,res,next)=>{

 const newUserData = {
  name:req.body.name,
  email:req.body.email,
 }
const user = await User.findOneAndUpdate(req.user.id,newUserData,{
  new:true,
  runValidators:true,

})
    // await user.save();
    res.status(200).json({
      success: true,
    }); 

  })


//Get All Users
export const getAllUsers = catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find();

  if (!users) {
    return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    users
  }); 
   

}) 

//Get single User
export const getAllUser = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user
  }); 
   

}) 

//Update User Role --Admin
export const updateUserRole = catchAsyncErrors(async(req,res,next)=>{

  const newUserData = {
   name:req.body.name,
   email:req.body.email,
   role:req.body.role,
  }
 const user = await User.findOneAndUpdate(req.user.id,newUserData,{
   new:true,
   runValidators:true,
 
 })
 if (!user) {
  return next(new ErrorHandler(`User does not exist with id:${req.params.id}`, 404));
}
     // await user.save();
     res.status(200).json({
       success: true,
     }); 
 
   })

//Delete User
export const deleteUser = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`, 400));
  }
     await user.remove();
     res.status(200).json({
       success: true,
       message:"User Deleted Successfully"
     }); 
 
   })
 
 
  //FORGOT PASSWORD
  
  // export const forgotPasword = catchAsyncErrors(async(req,res,next)=>{
  
  //     const user = await User.findOne({email:req.body.email});
  //     if(!user){
  //         return next(new ErrorHandler("user not found",404))
  //     }
  //     //get Reset Token
      // const resetToken =  user.getResetPasswordToken();
  //     console.log(resetToken)
  
  //     await user.save({validateBeforeSave : false});
  //     const  resetPaswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
  //     const message = `Your password reset token is :- \n\n ${resetPaswordUrl} \n\n If you have not requested this email then,please ignore it`;
  
  //     try{
  
  //         await sendEmail({
  //             email:user.email,
  //             subject:`Eccommerce PassWord Recovery`,
  //             message
  
  //         })
  
  //         res.status(200)({
  //             success:true,
  //             message:`Email sent to ${user.email} successfully`
  //         })
  
  //     } catch (error){
  //         user.resetPasswordToken = undefined;
  //         user.resetPasswordExpire = undefined;
  //         await user.save({validateBeforeSave : false});
  
  //         return next(new ErrorHandler(ErrorHandler(error.message,500)));
  
  //     }
  // })