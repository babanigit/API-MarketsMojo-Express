"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importStar(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const trailSchema_1 = require("./models/trailSchema");
dotenv_1.default.config({ path: "../.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.enable("trust proxy");
// Get the base route
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Trail route
app.get("/trail", (req, res) => {
    res.send("trail routes");
});
app.get("/holding", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const holding = yield trailSchema_1.holding_model.findOne();
        res.status(200).json({
            code: 200,
            message: "Success",
            data: holding,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
app.get("/totalReturn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const holding = yield trailSchema_1.total_return_model.findOne();
        res.status(200).json({
            code: 200,
            message: "Success",
            data: holding,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Endpoint middleware for handling 404
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Endpoint not found"));
});
// Error handler middleware
app.use((error, req, res, next) => {
    console.error("👺[error log]:", error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    let success = false;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({
        success,
        message: errorMessage,
        statusCode,
    });
});
exports.default = app;
