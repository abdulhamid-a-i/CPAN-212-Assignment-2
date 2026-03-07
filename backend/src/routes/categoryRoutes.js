import express from "express";
import {
  getCategories,
  createCategory
} from "../controllers/categoryController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", requireAuth, createCategory);

export default router;