import express from "express";
import {
  createQuote,
  getQuotesForRequest,
  acceptQuote
} from "../controllers/OLDquoteController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.post(
  "/requests/:id/quotes",
  requireAuth,
  requireRole("provider"),
  createQuote
);

router.get("/requests/:id/quotes", requireAuth, getQuotesForRequest);

router.patch(
  "/quotes/:id/accept",
  requireAuth,
  requireRole("resident"),
  acceptQuote
);

export default router;