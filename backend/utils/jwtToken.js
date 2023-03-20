//creating token and saving in cookie
import { JWT_EXPIRE,COOKIE_EXPIRE } from "../config/index.js"
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken()
    //option for cookie
    const options = {
        expires:new Date(Date.now() + COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly: true,

    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    })
};

export default sendToken;