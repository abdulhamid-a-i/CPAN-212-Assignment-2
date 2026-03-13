import mongoose from "mongoose";
import Quote from "../models/Quote.js";
import ServiceRequest from "../models/ServiceRequest.js";
import AppError from "../utils/AppError.js";

export const createQuote = async (req, res, next) => {
  try {
    const { price, message, daysToComplete } = req.body;
    const requestId = req.params.id;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      throw new AppError("Request not found", 404);
    }

    if (!["open", "quoted"].includes(request.status)) {
      throw new AppError("Request not open for quotes", 400);
    }

    const quote = await Quote.create({
      requestId,
      providerId: req.session.userId,
      price,
      message,
      daysToComplete
    });

    if (request.status === "open") {
      request.status = "quoted";
      await request.save();
    }

    res.status(201).json(quote);
  } catch (err) {

    if (err.code === 11000) {
      return next(new AppError("Already quoted this request", 409));
    }
    next(err);
  }
};

export const getQuotesForRequest = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      throw new AppError("Request not found", 404);
    }

    if (
      req.session.role === "resident" &&
      request.createdBy.toString() !== req.session.userId
    ) {
      throw new AppError("Forbidden", 403);
    }

    const filter =
      req.session.role === "provider"
        ? { requestId: req.params.id, providerId: req.session.userId }
        : { requestId: req.params.id };
    const quotes = await Quote.find(filter).populate("providerId", "fullName");

    res.json(quotes);

  } catch (err) {
    next(err);
  }
};

export const acceptQuote = async (req, res, next) => {
  try {
    const quoteId = req.params.id;
    const userId = req.session.userId;
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return next(new AppError("Quote not found", 404));
    }

    const request = await ServiceRequest.findById(quote.requestId);

    if (!request) {
      return next(new AppError("Service request not found", 404));
    }

    if (request.createdBy.toString() !== userId) {
      return next(new AppError("Not authorized to accept this quote", 403));
    }

    if (request.status !== "open") {
      return next(new AppError("Request is not open for accepting quotes", 400));
    }

    await Quote.updateMany(
      { requestId: request._id },
      { $set: { status: "rejected" } }
    );

    quote.status = "accepted";
    await quote.save();

    request.status = "quoted";
    request.acceptedQuoteId = quote._id;

    await request.save();

    res.status(200).json({
      status: "success",
      data: {
        quote
      }

    });
  } catch (err) {
    next(err);
  }
};