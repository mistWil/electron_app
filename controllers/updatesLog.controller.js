const mongoose = require("mongoose");
const updatesLogModel = require("../models/updatesLog.model");
const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");

const create = catchAsync(async (req, res) => {
  const updatesLog = await updatesLogModel.create(req.body);
  res.send(updatesLog);
});

const getAll = catchAsync(async (req, res) => {
  const updatesLogs = await updatesLogModel.find();
  res.send(updatesLogs);
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

  const updatesLog = await updatesLogModel.findById(checkId);
  if (updatesLog) {
    res.send(updatesLog);
  } else {
    logger.error("Update not found", {
      errorName: "NotFoundError",
      errorMessage: "Update not found",
    });
    res.status(404).send("Update not found");
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

  const updatesLog = await updatesLogModel.findByIdAndUpdate(checkId);
  if (updatesLog) {
    res.send(updatesLog);
  } else {
    logger.error("Update not found", {
      errorName: "NotFoundError",
      errorMessage: "Update not found",
    });
    res.status(404).send("Update not found");
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

  const updatesLog = await updatesLogModel.findByIdAndDelete(checkId);
  if (updatesLog) {
    res.send(updatesLog);
  } else {
    logger.error("Update not found", {
      errorName: "ErrorNotFound",
      errorMessage: "Update not found",
    });
    res.status(404).send("Update not found");
  }
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
