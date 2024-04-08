import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

//create project
export const createProject = asyncHandler(async (req, res) => {
  const { title, para, date } = req.body;

  if (!(title && para && date)) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const imageLocalPath = req.file.path;
    if (!imageLocalPath) {
      throw new ApiError(400, "Image local path is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath, "projects");
    if (!image) {
      throw new ApiError(400, "Image upload failed");
    }

    const project = await Project.create({
      title,
      para,
      date,
      img: image.url,
    });

    res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get all projects
export const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (!projects) {
      throw new ApiError(400, "Projects not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get a project by id
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(400, "Project not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//update project
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, para, date } = req.body;

  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  try {
    if (title) {
      project.title = title;
    }

    if (para) {
      project.para = para;
    }

    if (date) {
      project.date = date;
    }

    if (req.file) {
      if (project.img) {
        await deleteFromCloudinary(project.img);
      }

      const newImageLocalPath = req.file.path;
      if (!newImageLocalPath) {
        throw new ApiError(400, "Image local path is required");
      }

      const newImage = await uploadOnCloudinary(newImageLocalPath, "projects");
      if (!newImage) {
        throw new ApiError(400, "Image upload failed");
      }

      project.img = newImage.url;
    }

    const updatedProject = await project.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedProject, "Project updated successfully")
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//delete project
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  try {
    if (project.img) {
      await deleteFromCloudinary(project.img);
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Project deleted successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});

//get 3 latest projects
export const getLatestProjects = asyncHandler(async (req, res) => {
  try {
    const latestProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3);
    if (!latestProjects) {
      throw new ApiError(400, "latestProjects not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, latestProjects, "Projects fetched successfully")
      );
  } catch (error) {
    throw new ApiError(error);
  }
});

//get random 3 projects
export const getRandomProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.aggregate([
      {
        $sample: {
          size: 3,
        },
      },
    ]);

    if (!projects) {
      throw new ApiError(400, "Projects not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects fetched successfully"));
  } catch (error) {
    throw new ApiError(error);
  }
});
