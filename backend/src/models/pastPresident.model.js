import mongoose from "mongoose";

const PastPresidentSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const PastPresidents = mongoose.model(
  "PastPresidents",
  PastPresidentSchema
);
