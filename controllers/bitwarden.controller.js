const catchAsync = require("../helpers/catchAsync");
const logger = require("../config/logger");

const getDownloadLink = catchAsync(async (req, res) => {
  try {
    const downloadUrl =
      "https://vault.bitwarden.com/download/?app=desktop&platform=windows";
    res.send({ downloadUrl: downloadUrl });
  } catch (error) {
    logger.error("Downloading error", {
      errorName: error.name,
      errorMessage: error.message,
    });
    res.status(500).send("Downloading error");
  }
});

module.exports = {
  getDownloadLink,
};
