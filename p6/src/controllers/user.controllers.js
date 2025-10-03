 import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

 const registerUser = asyncHandler( async (req,res)=> {
    const {fullName,username,email,password} = req.body

    //validation
    if(
        [fullName,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required")
    }

     const existedUser = await username.findOne({
        $or: [{username}, {email}]
     })
 if (existedUser) {
   throw new ApiError(401, "User already exists");
 }
 
 })




 export {
    registerUser
 }