import { Members } from "../models/members.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import asyncHandler from "express-async-handler";

//create  member
export const createMembers = asyncHandler(async (req, res) => {
  const { name, post } = req.body;

  const imageLocalPath = req.file.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image local path is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath, "Rac_team");
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  const CreateMembers = await Members.create({
    name,
    post,
    image: image.url,
  });

  res
    .status(201)
    .json(new ApiResponse(201, CreateMembers, " member created successfully"));
});

//get all  members
export const getAllMembers = asyncHandler(async (req, res) => {
  try {
    const AllMembers = await Members.find().sort({ post: 1 });
    return res
      .status(200)
      .json(new ApiResponse(200, AllMembers, "Members fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get a project by id
export const getMembersById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const members = await Members.findById(id);
    if (!members) {
      throw new ApiError(400, "Members not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, members, "Members fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//update  members
export const updateMembers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, post } = req.body;

  const members = await Members.findById(id);
  if (!members) {
    throw new ApiError(400, "Members not found");
  }
  try {
    if (name) {
      members.name = name;
    }

    if (post) {
      members.post = post;
    }

    if (req.file) {
      if (members.image) {
        await deleteFromCloudinary(members.image);
      }

      const newImageLocalPath = req.file.path;
      if (!newImageLocalPath) {
        throw new ApiError(400, "Image local path is required");
      }

      const newImage = await uploadOnCloudinary(newImageLocalPath, "Rac_team");
      if (!newImage) {
        throw new ApiError(400, "Image upload failed");
      }

      members.image = newImage.url;
    }
    const updatedMembers = await members.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedMembers, " members updated successfully")
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//delete  members
export const deleteMembers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const members = await Members.findById(id);
  if (!members) {
    throw new ApiError(400, "Members not found");
  }

  try {
    await deleteFromCloudinary(members.image);

    const deletedMembers = await Members.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, " members deleted successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});
