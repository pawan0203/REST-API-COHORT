import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
    require: [true, "Name is required"]
  },
  email: {
    type: String,
    trim: true,
    require: [true, "Name is required"],
    unique: true,
    lowercase: true,
    },
    password: { 
    type: String,
    require: [true, "Password is required"],
    minlength: 8,
    select: false
     },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verificationToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetpasswordToken: { type: String, select: false },
    resetpasswordExpires: { type: Date, select: false },
}, { timestamps: true })

export default mongoose.model("User", userschema)