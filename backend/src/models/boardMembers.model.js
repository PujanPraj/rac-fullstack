import mongoose from "mongoose";

const boardMemberSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

//Export the model
export const BoardMembers = mongoose.model("BoardMembers", boardMemberSchema);
