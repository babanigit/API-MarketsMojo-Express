"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalReturns = exports.getHoldings = void 0;
const trailSchema_1 = require("../models/trailSchema");
const getHoldings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const holding = yield trailSchema_1.holding_model.findOne();
        res.status(200).json({
            code: 200,
            message: "Success",
            data: holding,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getHoldings = getHoldings;
const getTotalReturns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalReturns = yield trailSchema_1.total_return_model.findOne();
        res.status(200).json({
            code: 200,
            message: "Success",
            data: totalReturns,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getTotalReturns = getTotalReturns;
