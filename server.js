import dotenv from 'dotenv';
import path from "path";
import logger from "morgan";
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import errorHandler from "./src/middlewares/errorHandler.js";
import { fileURLToPath } from 'url';
import { createServer } from "http";
import healthRoutes from './src/routes/healthRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

dotenv.config();
const app = express();
const httpServer = createServer(app); // Create HTTP server

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
const router = express.Router();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// All routes
app.use("/api", router);

router.use("/health", healthRoutes);
router.use("/users", userRoutes);

// Health check base route
app.get("/", (req, res) => {
  res.send("Welcome to CRM API 🚀");
});

// Error Handler
app.use(errorHandler);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});