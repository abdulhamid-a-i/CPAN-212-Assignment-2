import bcrypt from "bcrypt";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = 10;

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      throw new AppError("Missing required fields", 400);
    }

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      throw new AppError("Email already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password required", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      throw new AppError("Invalid credentials", 401);
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy(err => {
      if (err) return next(err);
      res.json({ message: "Logged out" });
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await User
      .findById(req.session.userId)
      .select("-passwordHash");

    res.json({
      authenticated: true,
      user});

  } catch (err) {
    next(err);
  }
};