import mongoose from "mongoose";

var ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

//Export the model
export const Contact = mongoose.model("Contact", ContactSchema);
