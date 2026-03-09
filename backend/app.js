import express from "express";
import cors from "cors";
import sessionConfig from "./src/config/session.js";

import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import requestRoutes from "./src/routes/requestRoutes.js";
import quoteRoutes from "./src/routes/quoteRoutes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";


const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(sessionConfig);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/quotes", quoteRoutes);

app.use(errorHandler);

export default app;