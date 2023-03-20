import app from "./app.js";
import { APP_PORT } from "./config/index.js";
import connectDataBase from "./config/database.js";
// import {v2 as cloudinary} from "cloudinary"
// import { CLOUDINARY_API_KEY,CLOUDINARY_NAME,CLOUDINARY_API_SECRET } from "./config/index.js";

//handling uncaught exception
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to uncaught exception")
    process.exit(1);
})

// APP_PORT=3000
//connecting to server database
connectDataBase();
// cloudinary.config({
//     cloud_name:CLOUDINARY_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET
// });
const server = app.listen(APP_PORT,()=>{
    console.log(`port is listening at ${APP_PORT}`)
})
 

//unhandled promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to unHandled Promise Rejection")
    server.close(()=>{process.exit(1)})
})