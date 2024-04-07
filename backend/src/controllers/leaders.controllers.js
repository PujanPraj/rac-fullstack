import { Leader } from "../models/leaders.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

//create leader
export const createLeader = asyncHandler(async (req, res) => {
  const { name, post, msg1, msg2 } = req.body;

  try {
    const imgLocalPath = req.file.path;
    if (!imgLocalPath) {
      throw new ApiError(400, "Image local path is required");
    }

    const img = await uploadOnCloudinary(imgLocalPath, "leader");
    if (!img) {
      throw new ApiError(400, "Image upload failed");
    }

    const newLeader = await Leader.create({
      name,
      post,
      img: img.url,
      msg1,
      msg2,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newLeader, " leader created successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get all leaders
export const getAllLeaders = asyncHandler(async (req, res) => {
  try {
    const leaders = await Leader.find();
    if (!leaders) {
      throw new ApiError(400, "Leaders not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, leaders, "Leaders fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get a leader by id
export const getLeaderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const leader = await Leader.findById(id);
    if (!leader) {
      throw new ApiError(400, "Leader not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, leader, "Leader fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//update a leader by id
export const updateLeader = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, post, msg1, msg2 } = req.body;

  const leader = await Leader.findById(id);
  if (!leader) {
    throw new ApiError(400, "Leader not found");
  }

  try {
    if (name) {
      leader.name = name;
    }
    if (post) {
      leader.post = post;
    }
    if (msg1) {
      leader.msg1 = msg1;
    }
    if (msg2) {
      leader.msg2 = msg2;
    }

    if (req.file) {
      if (leader.img) {
        await deleteFromCloudinary(leader.img);
      }

      const newImgLocalPath = req.file.path;
      if (!newImgLocalPath) {
        throw new ApiError(400, "Image local path is required");
      }

      const newImg = await uploadOnCloudinary(newImgLocalPath, "leader");
      if (!newImg) {
        throw new ApiError(400, "Image upload failed");
      }

      leader.img = newImg.url;
    }

    const updatedLeader = await leader.save();

    return res
      .status(200)
      .json(new ApiResponse(200, updatedLeader, "Leader updated successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//delete a leader by id
export const deleteLeader = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const leader = await Leader.findById(id);
  if (!leader) {
    throw new ApiError(400, "Leader not found");
  }
  try {
    if (leader.img) {
      await deleteFromCloudinary(leader.img);
    }

    const deletedLeader = await Leader.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Leader deleted successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});
