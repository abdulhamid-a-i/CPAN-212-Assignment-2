import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80
  },
  status: {
    type: String,
    enum: ["open", "quoted", "assigned", "completed", "cancelled"],
    default: "open"
  },
  acceptedQuoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quote"
  }
}, { timestamps: true });

serviceRequestSchema.index({ title: "text", description: "text" });

export default mongoose.model("ServiceRequest", serviceRequestSchema);

