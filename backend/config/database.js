import mongoose from "mongoose";
import { DB_URL } from "./index.js";

const connectDataBase = ()=> {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,'useCreateIndex': true })
    .then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
    
}
export default connectDataBase;