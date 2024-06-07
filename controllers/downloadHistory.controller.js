const mongoose = require("mongoose");
const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");
const downloadHistoryModel = require("../models/downloadHistory.model");
const { error } = require("winston");

const create = catchAsync(async (req, res) => {
    const downloaded_tool = await downloadHistoryModel.create(req.body);
    res.send(downloaded_tool);
});

const getAll = catchAsync(async (req, res) => {
    const downloads = await downloadHistoryModel.find();
    res.send(downloads);
});

const getById = catchAsync(async (req, res) => {
    const checkId = req.params.id;
    try {
        new mongoose.Types.ObjectId(checkId);
    } catch (e) {
        logger.error("Invalid id format", {
            errorName: e.name,
            errorMessage: e.message,
        })
        return res.status(404).send("Invalid id format");
    }

    const downloaded_tool = await downloadHistoryModel.findById(checkId);
    if (downloaded_tool) {
        res.send(downloaded_tool);
    } else {
        logger.error("Download not found", {
            errorName: "NotFoundError",
            errorMessage: "Download not found",
        });
        res.status(404).send("Download not found");
    }
});

const updateById = catchAsync(async (req, res) => {
    const checkId = req.params.id;
    try {
        new mongoose.Types.ObjectId(checkId);
    } catch (error) {
        logger.error("Invalid id format", {
            errorName: error.name,
            errorMessage: error.message,
        });
        return res.status(404).send("Invalid id format");
    }

    const downloaded_tool = await downloadHistoryModel.findByIdAndUpdate(checkId);
    if (downloaded_tool) {
        res.send(downloaded_tool);
    } else {
        logger.error("Download not found", {
            errorName: "ErrorNotFound",
            errorMessage: "Download not found",
        });
        res.status(404).send("Download not found");
    }
});

const deleteById = catchAsync(async (req, res) => {
    const checkId = req.params.id;
    try {
        new mongoose.Types.ObjectId(checkId);
    } catch (error) {
        logger.error("Invalid id format", {
            errorName: error.name,
            errorMessage: error.message,
        });
        return res.status(404).send("Invalid id format");
    }

    const downloaded_tool = await downloadHistoryModel.findByIdAndDelete(checkId);
    if (downloaded_tool) {
        res.send(downloaded_tool);
    } else {
        logger.error("Download not found", {
            errorName: "ErrorNotFound",
            errorMessage: "Download not found",
        })
        res.status(404).send("Download not found");
    }
})

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}

