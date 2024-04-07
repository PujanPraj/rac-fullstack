import {
  User,
  generateAccessToken,
  generateRefreshToken,
} from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new ApiError(400, "Email already registered");
  }

  const avatarLocalPath = req.file.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath, "avatar");

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  const user = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    bloodGroup: req.body.bloodGroup,
    address: req.body.address,
    age: req.body.age,
    phone: req.body.phone,
    designation: req.body.designation,
    avatar: avatar.url,
  });

  const createdUser = await User.findOne(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new ApiError(400, "Invalid Credentials");
  }

  try {
    if (findUser && (await findUser.isPasswordMatch(password))) {
      const accessToken = await generateAccessToken(findUser._id);
      const refreshToken = await generateRefreshToken(findUser._id);

      findUser.refreshToken = refreshToken;
      findUser.save();

      const options = {
        httpOnly: true,
        secure: true,
      };

      const user = await User.findById(findUser._id).select(
        "-password -refreshToken"
      );

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(200, "User logged in successfully", {
            user,
            accessToken,
          })
        );
    } else {
      throw new ApiError(400, "Invalid Credentials");
    }
  } catch (error) {
    throw new ApiError(error);
  }
});

//logout user
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//get user by id
export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const findUser = await User.findById(userId);

    const user = await User.findById(findUser.id).select(
      "-password -refreshToken"
    );
    res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", user));
  } catch (error) {
    throw new Error(error);
  }
});

//get all user
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
