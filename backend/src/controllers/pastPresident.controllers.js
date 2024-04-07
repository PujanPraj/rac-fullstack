import { PastPresidents } from "../models/pastPresident.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import asyncHandler from "express-async-handler";

//create board member
export const createPastPresidents = asyncHandler(async (req, res) => {
  const { name, post, year } = req.body;

  const imageLocalPath = req.file.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image local path is required");
  }

  console.log(imageLocalPath);

  const image = await uploadOnCloudinary(imageLocalPath, "Rac_team");
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  const CreatePastPresidents = await PastPresidents.create({
    name,
    post,
    year,
    image: image.url,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        CreatePastPresidents,
        "Board member created successfully"
      )
    );
});

//get all board members
export const getAllPastPresidents = asyncHandler(async (req, res) => {
  try {
    const AllPastPresidents = await PastPresidents.find();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          AllPastPresidents,
          "Board members fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//get a project by id
export const getPastPresidentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const PastPresident = await PastPresidents.findById(id);
    if (!PastPresident) {
      throw new ApiError(400, "PastPresident not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          PastPresident,
          "PastPresident fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//update board members
export const updatePastPresidents = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, post, year } = req.body;

  const PastPresident = await PastPresidents.findById(id);
  if (!PastPresident) {
    throw new ApiError(400, "Board members not found");
  }
  try {
    if (name) {
      PastPresident.name = name;
    }

    if (post) {
      PastPresident.post = post;
    }

    if (year) {
      PastPresident.year = year;
    }

    if (req.file) {
      if (PastPresident.image) {
        await deleteFromCloudinary(PastPresident.image);
      }

      const newImageLocalPath = req.file.path;
      if (!newImageLocalPath) {
        throw new ApiError(400, "Image local path is required");
      }

      const newImage = await uploadOnCloudinary(newImageLocalPath, "Rac_team");
      if (!newImage) {
        throw new ApiError(400, "Image upload failed");
      }

      PastPresident.image = newImage.url;
    }
    const updatedPastPresidents = await PastPresident.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedPastPresidents,
          "Board members updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//delete board members
export const deletePastPresidents = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const PastPresident = await PastPresidents.findById(id);
  if (!PastPresident) {
    throw new ApiError(400, "Board members not found");
  }

  try {
    await deleteFromCloudinary(PastPresident.image);

    const deletedPastPresidents = await PastPresidents.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Board members deleted successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});
