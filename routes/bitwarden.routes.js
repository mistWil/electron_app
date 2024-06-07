const express = require("express");
const router = express.Router();
const bitwardenController = require("../controllers/bitwarden.controller");

router.get("/download", bitwardenController.getDownloadLink);

module.exports = router;
