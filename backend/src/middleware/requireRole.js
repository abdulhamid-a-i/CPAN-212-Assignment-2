import AppError from "../utils/AppError.js";
import ServiceRequest from "../models/ServiceRequest.js";
import mongoose from "mongoose";

export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};


export const requireRequestOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Forbidden", 403));
    }

    const request = await ServiceRequest.findById(id);

    if(!request){
      return next(new AppError("Request Not Found", 404));
    }

    const isOwner = request.createdBy.toString() === req.session.userId;

    const isResident = req.session.role === 'resident'

    if(!isOwner || !isResident){
      return next(new AppError("Forbidden", 403));
    }

    req.request = request;
    next();
  } catch (error) {
    return next(new AppError("Forbidden", 403));
  }
};