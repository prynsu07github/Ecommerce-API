/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        throw err
    })
}

export default connectDatabase
