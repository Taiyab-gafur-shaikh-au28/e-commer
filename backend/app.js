import express from 'express';
const app = express()
import errorMiddleware from "./middleware/error.js"

app.use(express.json());
app.use(cookieParser());

//Routes import
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser"
// import fileUpload from 'express-fileupload';


//middlewares for error
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());
//Routes
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

//middlewares for error
app.use(errorMiddleware);

export default app;



