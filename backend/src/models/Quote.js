import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceRequest",
    required: true,
    index: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
  },
  daysToComplete: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

quoteSchema.index({ requestId: 1, providerId: 1 }, { unique: true });

export default mongoose.model("Quote", quoteSchema);

