import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"], // Define roles
      default: "buyer", // Default role is buyer
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
