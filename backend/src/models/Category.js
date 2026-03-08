import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
},
    {timestamps: true}

);

export default mongoose.model("Category", categorySchema);
