import mongoose from "mongoose";
import { use } from "react";
import bcrypt from "bcryptjs";

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


userschema.pre("save", async function (next) { 
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})


export default mongoose.model("User", userschema)