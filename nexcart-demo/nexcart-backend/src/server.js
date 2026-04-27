import express from "express";
import { connectDB } from "./config/db.js";
import { appConfig } from "./config/appConfig.js";
import { loggingService } from "./services/loggingService.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import merchantRoutes from "./routes/merchantRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import awsRoutes from "./routes/awsRoutes.js";

const app = express();

/**
 * Allowed frontend origins
 * 
 * FRONTEND_URL and CORS_ORIGIN can be set in .env.
 * The Amplify URL is also included directly for your current AWS deployment.
 */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "https://main.dmnhvl40scvmb.amplifyapp.com",
]
  .filter(Boolean)
  .flatMap((originList) =>
    originList.split(",").map((origin) => origin.trim())
  )
  .filter(Boolean);

const uniqueAllowedOrigins = [...new Set(allowedOrigins)];

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "nexcart-backend",
    env: appConfig.env,
    aws: {
      useS3: appConfig.aws.useS3,
      useSns: appConfig.aws.useSns,
      useCloudWatch: appConfig.aws.useCloudWatch,
      useCognito: appConfig.aws.useCognito,
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/merchant", merchantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/aws", awsRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    path: req.originalUrl,
  });
});

app.use((err, req, res, _next) => {
  console.error("Server error:", err);

  res.status(500).json({
    message: "Server error",
    error: appConfig.env === "development" ? err.message : undefined,
  });
});

connectDB()
  .then(() => {
    app.listen(appConfig.port, () => {
      loggingService.info(
        `NexCart backend running on http://localhost:${appConfig.port}`
      );

      console.log("Allowed CORS origins:", uniqueAllowedOrigins);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
