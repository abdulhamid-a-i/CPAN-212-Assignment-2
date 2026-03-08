import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 80,
        trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },

  passwordHash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["resident", "provider"],
    required: true
  }
},
    {timestamps: true}
);

export default mongoose.model("User", userSchema);