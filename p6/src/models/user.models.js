import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new Schema(
    {
username:{
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index: true,
},
avatar: {
    type: String,
    required: true
},
coverImage: {
    type: String,
},
watchHistory: [
    {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
],
password: {
    type: String,
    required: [true, "Password is required"]
},
refreshToken:{
    type: String
},
    },
    { timestamps: true }
)
 userSchema.pre("Save", async function (next) {
    if(!this.modified("password")) return next()

        this.password = bcrypt.hash(this.password, 10)

        next()

 })

 

export const User = Mongoose.model("User", userSchema)