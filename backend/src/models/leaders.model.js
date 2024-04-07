import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema(
  {
    img: {
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
    msg1: {
      type: String,
      required: true,
    },
    msg2: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Leader = mongoose.model("Leader", leaderSchema);
