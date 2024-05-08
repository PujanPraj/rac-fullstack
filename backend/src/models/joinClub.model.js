import mongoose from "mongoose";

var JoinClubSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

//Export the model
export const JoinClub = mongoose.model("JoinClub", JoinClubSchema);
