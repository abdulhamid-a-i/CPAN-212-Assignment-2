import ServiceRequest from "../models/ServiceRequest.js";
import Quote from "../models/Quote.js";
import AppError from "../utils/AppError.js";
import { validateRequestStatus } from "../utils/validator.js";

export const createRequest = async (req, res, next) => {
  try {
    const { title, description, categoryId, location } = req.body;

    if (!title || !description || !categoryId || !location) {
      throw new AppError("Missing required fields", 400);
    }

    const request = await ServiceRequest.create({
      title,
      description,
      categoryId,
      location,
      createdBy: req.session.userId
    });

    res.status(201).json(request);

  } catch (err) {
    next(err);
  }
};

export const getRequests = async (req, res, next) => {
  try {
    const { status, categoryId, q } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (categoryId) filter.categoryId = categoryId;

    let query;

    if (q) {
      query = ServiceRequest.find({
        ...filter,
        $text: { $search: q }
      });
    } else {
      query = ServiceRequest.find(filter);
    }

    const requests = await query
      .sort({ createdAt: -1 })
      .populate("categoryId", "name")
      .populate("createdBy", "fullName");

    res.json(requests);

  } catch (err) {
    next(err);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const request = await ServiceRequest
      .findById(req.params.id)
      .populate("categoryId", "name")
      .populate("createdBy", "fullName");

    if (!request) {
      throw new AppError("Request not found", 404);
    }

    res.json(request);

  } catch (err) {
    next(err);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      throw new AppError("Request not found", 404);
    }

    if (request.createdBy.toString() !== req.session.userId) {
      throw new AppError("Forbidden", 403);
    }

    const result = validateRequestStatus(request.status, status);

    if (!result.ok){
      throw new AppError(`Invalid Transition: ${request.status} to ${status}`, 400)
    }

    const acceptedQuote = await Quote.findById(request.acceptedQuoteId);
    if (acceptedQuote && status === 'cancelled'){
      acceptedQuote.status = 'rejected';
      acceptedQuote.save();
    } 

    request.status = status;

    await request.save();

    res.json(request);

  } catch (err) {
    next(err);
  }
};