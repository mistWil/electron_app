const mongoose = require("mongoose");
const securityToolsModel = require("../models/securityTools.model");
const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");

const create = catchAsync(async (req, res) => {
  const securityTool = await securityToolsModel.create(req.body);
  res.send(securityTool);
});

const getAll = catchAsync(async (req, res) => {
  const securityTools = await securityToolsModel.find();
  res.send(securityTools);
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

  const securityTool = await securityToolsModel.findById(checkId);
  if (securityTool) {
    res.send(securityTool);
  } else {
    logger.error("securityTool not found", {
      errorName: "NotFoundError",
      errorMessage: "securityTool not found",
    });
    res.status(404).send("securityTool not found");
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

  const securityTool = await securityToolsModel.findByIdAndUpdate(
    checkId,
    req.body
  );
  if (securityTool) {
    res.send(securityTool);
  } else {
    logger.error("securityTool not found", {
      errorName: "NotFoundError",
      errorMessage: "securityTool not found",
    });
    res.status(404).send("securityTool not found");
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

  const securityTool = await securityToolsModel.findByIdAndDelete(checkId);
  if (securityTool) {
    res.send(securityTool);
  } else {
    logger.error("securityTool not found", {
      errorName: "NotFoundError",
      errorMessage: "securityTool not found",
    });
    res.status(404).send("securityTool not found");
  }
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
