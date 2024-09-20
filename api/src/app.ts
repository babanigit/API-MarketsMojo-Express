import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {  holding_model, total_return_model } from "./models/trailSchema";

dotenv.config({ path: "../.env" });

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.enable("trust proxy");

// Get the base route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Trail route
app.get("/trail", (req: Request, res: Response) => {
  res.send("trail routes");
});


app.get("/holding", async (req: Request, res: Response) => {
  try {
    const holding = await holding_model.findOne();
    res.status(200).json({
      code: 200,
      message: "Success",
      data: holding,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/totalReturn", async (req: Request, res: Response) => {
  try {
    const holding = await total_return_model.findOne();
    res.status(200).json({
      code: 200,
      message: "Success",
      data: holding,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});



// Endpoint middleware for handling 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error handler middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("👺[error log]:", error);

  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  let success = false;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({
    success,
    message: errorMessage,
    statusCode,
  });
});

export default app;
