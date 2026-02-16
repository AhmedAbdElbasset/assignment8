import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";

export const authentiacteDB=async()=>{
    try{
        await mongoose.connect(DB_URI,{serverSelectionTimeoutMS:30000})
        console.log(`DB IS CONNECTD`)
    }
    catch(error){
        console.log(`faild to connect DB ${error}`)
    }
}