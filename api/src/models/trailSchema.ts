import mongoose, { InferSchemaType, Schema } from "mongoose";

// Define the Listing schema
const schema = new mongoose.Schema({
  _id: {
    type: String, // Use String for the custom ID
    required: true,
  },

});

type hello = InferSchemaType<typeof schema>;

export const schema_model = mongoose.model<hello>("listingsAndReview", schema);
export const holding_model=mongoose.model<hello>("getholding", schema);
export const total_return_model=mongoose.model<hello>("gettotalreturn", schema);


