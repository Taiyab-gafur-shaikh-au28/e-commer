import mongoose from "mongoose";
// import express from "express";

const productSchema = new mongoose.Schema({
    name: {
            type:String,
            required:[true,"Please Enter Product Name"],

    },
    description: {
            type:String,
            required:[true,"Please Enter Product Desciption"],
             
    },
    price: {
    type:Number,
    required:[true,"Please Enter Product Price"],
    maxLength:[8,"Price cannot exceed 8 character"]
    },
    ratings: {
    type:Number,
    default:0
    },
    images:[
   {
    public_id : {
        type:String,
        required: true
        },
        url : {
            type:String,
            required: true
            }
   }
    ],
    category: {
        type: String,
        required: [true,"Please Enter Your Product Category"]
    },
    Stock : {
        type: Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed four character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {   user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
             },
            name: {
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required : true,
            },
            comment:{
                type:String,
                required: true
            }
        
    }
],
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
},
createdAt:{
    type:Date,
    default:Date.now
}
}) 
export default  mongoose.model("Product",productSchema)
