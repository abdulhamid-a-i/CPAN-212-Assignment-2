import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus
} from "../controllers/requestController.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.get("/", getRequests);
router.get("/:id", getRequestById);

router.post("/", requireAuth, requireRole("resident"), createRequest);

router.patch(
  "/:id/status",
  requireAuth,
  requireRole("resident"),
  updateRequestStatus
);

export default router;