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
    console.log("Params:", req.params);
console.log("ID:", req.params.id);
    console.log("Incoming id:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new AppError("Forbidden", 403));
    }
    console.log("id valid")

    const request = await ServiceRequest.findById(id);
    console.log(request);

    if(!request){
      return next(new AppError("Request Not Found", 404));
    }

    console.log("Request Ownder: "+request.createdBy)
    console.log("User: "+ req.session.userId)
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