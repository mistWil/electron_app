const express = require("express");
const router = express.Router();
const securityToolsController = require("../controllers/securityTools.controller");

router.post("/securityTools", securityToolsController.create);
router.get("/securityTools", securityToolsController.getAll);
router.get("/securityTools", securityToolsController.getById);
router.patch("/securityTools", securityToolsController.updateById);
router.delete("/securityTools", securityToolsController.deleteById);

module.exports = router;
