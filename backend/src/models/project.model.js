import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    para: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Project = mongoose.model("Project", projectSchema);
