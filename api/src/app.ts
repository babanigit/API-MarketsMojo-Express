import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import ppRouter from "./routes/personalPortfolio_Routes";

dotenv.config({ path: "../.env" });

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.enable("trust proxy");

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// routes
app.use("/api/personalportfolio", ppRouter);

// Endpoint middleware for handling 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("👺[error log]:", error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  // let success = false;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    code: statusCode,
    message: errorMessage,
  });
});

export default app;
