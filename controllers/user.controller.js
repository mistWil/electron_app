const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");

const createUser = catchAsync(async (req, res) => {
  const user = await userModel.create(req.body);
  res.send('home', { user });
});

const getAll = catchAsync(async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

const getById = catchAsync(async (req, res) => {
  const checkId = req.params.id;
  try {
    new mongoose.Types.ObjectId(checkId);
  } catch (error) {
    logger.error("Invalid id format", {
      errorName: e.name,
      errorMessage: e.message,
    });
    return res.status(404).send("Invalid id format");
  }

  const user = await userModel.findById(checkId);
  if (user) {
    res.send(user);
  } else {
    logger.error("User not found", {
      errorName: "NotFoundError",
      errorMessage: "User not found",
    });
    res.status(404).send("User not found");
  }
});

const updateById = catchAsync(async (req, res) => {
  const checkId = req.params.id;
  try {
    new mongoose.Types.ObjectId(checkId);
  } catch (error) {
    logger.error("Invalid id format", {
      errorName: e.name,
      errorMessage: e.message,
    });
    return res.status(404).send("Invalid id format");
  }

  const user = await userModel.findByIdAndUpdate(checkId, req.body);
  if (user) {
    res.send(user);
  } else {
    logger.error("User not found", {
      errorName: "NotFoundError",
      errorMessage: "User not found",
    });
    res.status(404).send("User not found");
  }
});

const deleteById = catchAsync(async (req, res) => {
  const checkId = req.params.id;
  try {
    new mongoose.Types.ObjectId(checkId);
  } catch (error) {
    logger.error("Invalid id format", {
      errorName: e.name,
      errorMessage: e.message,
    });
    return res.status(404).send("Invalid id format");
  }

  const user = await userModel.findByIdAndDelete(checkId);
  if (user) {
    res.send(user);
  } else {
    logger.error("User not found", {
      errorName: "NotFoundError",
      errorMessage: "User not found",
    });
    res.status(404).send("User not found");
  }
});

module.exports = {
  createUser,
  getAll,
  getById,
  updateById,
  deleteById,
};
