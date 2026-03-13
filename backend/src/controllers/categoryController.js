import Category from "../models/Category.js";
import AppError from "../utils/AppError.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw new AppError("Category name required", 400);
    }
    const category = await Category.create({ name, description });
    res.status(201).json(category);

  } catch (err) {
    if (err.code === 11000) {
      return next(new AppError("Category already exists", 409));
    }
    next(err);
  }
};