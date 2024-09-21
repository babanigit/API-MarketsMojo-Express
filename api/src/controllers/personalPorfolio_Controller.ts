import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { holding_model, total_return_model } from "../models/trailSchema";

export const getHoldings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const holding = await holding_model.findOne();
    res.status(200).json({
      code: 200,
      message: "Success",
      data: holding,
    });
  } catch (error) {
    next(error);
  }
};

export const getTotalReturns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalReturns = await total_return_model.findOne();
    res.status(200).json({
      code: 200,
      message: "Success",
      data: totalReturns,
    });
  } catch (error) {
    next(error);
  }
};
