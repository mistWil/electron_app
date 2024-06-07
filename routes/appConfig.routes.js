const express = require("express");
const router = express.Router();
const appConfigController = require("../controllers/appConfig.controller");

router.post("/appConfig", appConfigController.create);
router.get("/appConfig", appConfigController.getAll);
router.get("/appConfig/:id", appConfigController.getById);
router.patch("/appConfig/:id", appConfigController.updateById);
router.delete("/appConfig/:id", appConfigController.deleteById);

module.exports = router;
