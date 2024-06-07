const express = require("express");
const router = express.Router();
const downloadHistoryController = require("../controllers/downloadHistory.controller");

router.post("/downloadHistory", downloadHistoryController.create);
router.get("/downloadHistory", downloadHistoryController.getAll);
router.get("/downloadHistory/:id", downloadHistoryController.getById);
router.patch("/downloadHistory/:id", downloadHistoryController.updateById);
router.delete("/downloadHistory/:id", downloadHistoryController.deleteById);

module.exports = router;
