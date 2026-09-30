import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectroutes.js";
import messageRoutes from "./routes/messageroutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// 404 for unmatched API routes
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

// Centralized error handler — catches anything a route forgot to try/catch
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB — database: "${mongoose.connection.name}" (${MONGODB_URI})`);

    const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `\nPort ${PORT} is already in use — another process (maybe a previous ` +
            `"npm run dev") is still running.\n` +
            `Windows: run "netstat -ano | findstr :${PORT}" to find its PID, then ` +
            `"taskkill /PID <pid> /F" to stop it.\n` +
            `Mac/Linux: run "lsof -i :${PORT}" then "kill -9 <pid>".\n` +
            `Or set a different PORT in backend/.env and restart.\n`
        );
      } else {
        console.error("Server failed to start:", err.message);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });