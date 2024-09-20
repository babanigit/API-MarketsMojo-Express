"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.total_return_model = exports.holding_model = exports.schema_model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Listing schema
const schema = new mongoose_1.default.Schema({
    _id: {
        type: String, // Use String for the custom ID
        required: true,
    },
});
exports.schema_model = mongoose_1.default.model("listingsAndReview", schema);
exports.holding_model = mongoose_1.default.model("getholding", schema);
exports.total_return_model = mongoose_1.default.model("gettotalreturn", schema);
