import { BoardMembers } from "../models/boardMembers.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import asyncHandler from "express-async-handler";

//create board member
export const createBoardMembers = asyncHandler(async (req, res) => {
  const { name, post } = req.body;

  const imageLocalPath = req.file.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image local path is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath, "Rac_team");
  if (!image) {
    throw new ApiError(400, "Image upload failed");
  }

  const CreateBoardMembers = await BoardMembers.create({
    name,
    post,
    image: image.url,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        CreateBoardMembers,
        "Board member created successfully"
      )
    );
});

//get all board members
export const getAllBoardMembers = asyncHandler(async (req, res) => {
  try {
    const AllBoardMembers = await BoardMembers.find();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          AllBoardMembers,
          "Board members fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//get a project by id
export const getBoardMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const BoardMember = await BoardMembers.findById(id);
    if (!BoardMember) {
      throw new ApiError(400, "BoardMember not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, BoardMember, "BoardMember fetched successfully")
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//update board members
export const updateBoardMembers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, post } = req.body;

  const boardMembers = await BoardMembers.findById(id);
  if (!boardMembers) {
    throw new ApiError(400, "Board members not found");
  }
  try {
    if (name) {
      boardMembers.name = name;
    }

    if (post) {
      boardMembers.post = post;
    }

    if (req.file) {
      if (boardMembers.image) {
        await deleteFromCloudinary(boardMembers.image);
      }

      const newImageLocalPath = req.file.path;
      if (!newImageLocalPath) {
        throw new ApiError(400, "Image local path is required");
      }

      const newImage = await uploadOnCloudinary(newImageLocalPath, "Rac_team");
      if (!newImage) {
        throw new ApiError(400, "Image upload failed");
      }

      boardMembers.image = newImage.url;
    }
    const updatedBoardMembers = await boardMembers.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedBoardMembers,
          "Board members updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//delete board members
export const deleteBoardMembers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const boardMembers = await BoardMembers.findById(id);
  if (!boardMembers) {
    throw new ApiError(400, "Board members not found");
  }

  try {
    await deleteFromCloudinary(boardMembers.image);

    const deletedBoardMembers = await BoardMembers.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Board members deleted successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get president
export const getPresident = asyncHandler(async (req, res) => {
  try {
    const president = await BoardMembers.findOne({ post: "President" });
    return res
      .status(200)
      .json(new ApiResponse(200, president, "President fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});
