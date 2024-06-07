const mongoose = require("mongoose");
const appConfigModel = require("../models/appConfig.model");
const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");

const create = catchAsync(async (req, res) => {
  const appConfig = await appConfigModel.create(req.body);
  res.send(appConfig);
});

const getAll = catchAsync(async (req, res) => {
  const appConfigs = await appConfigModel.find();
  res.send(appConfigs);
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

  const appConfig = await appConfigModel.findById(checkId);
  if (appConfig) {
    res.send(appConfig);
  } else {
    logger.error("App config not found", {
      errorName: "NotFoundError",
      errorMessage: "App config not found",
    });
    res.status(404).send("App config not found");
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

  const appConfig = await appConfigModel.findByIdAndUpdate(checkId);
  if (appConfig) {
    res.send(appConfig);
  } else {
    logger.error("App config not found", {
      errorName: "NotFoundError",
      errorMessage: "App config not found",
    });
    res.status(404).send("App config not found");
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

  const appConfig = await appConfigModel.findByIdAndDelete(checkId);
  if (appConfig) {
    res.send(appConfig);
  } else {
    logger.error("App config not found", {
      errorName: "ErrorNotFound",
      errorMessage: "App config not found",
    });
    res.status(404).send("App config not found");
  }
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
