import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Note } from "../models/note.model.js";
import mongoose from "mongoose";

export const createNote = asyncHandler(async (req, res) => {
  const { title, description, isPinned, tags } = req.body;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  const note = await Note.create({
    title,
    description,
    isPinned,
    tags,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note is created successfully"));
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    owner: req.user._id,
  }).sort({ isPinned: -1, updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully"));
});

export const getSingleNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(400, "Invalid note Id");
  }

  const note = await Note.findOne({
    _id: noteId,
    owner: req.user._id,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note fetched successfully"));
});

export const updateNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(400, "Invalid Note Id");
  }

  const { title, description, isPinned, tags } = req.body;

  if (
    title === undefined &&
    description === undefined &&
    isPinned === undefined &&
    tags === undefined
  ) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (isPinned !== undefined) updateFields.isPinned = isPinned;
  if (tags !== undefined) updateFields.tags = tags;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, owner: req.user._id },
    { $set: updateFields },
    { new: true }
  );

  if (!updatedNote) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

export const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    throw new ApiError(400, "Invalid Note Id");
  }

  const deletedNote = await Note.findOneAndDelete({
    _id: noteId,
    owner: req.user._id,
  });

  if (!deletedNote) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Note Deleted successfully"));
});
