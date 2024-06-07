const express = require("express");
const router = express.Router();
const updatesLogController = require("../controllers/updatesLog.controller");

router.post("/updatesLog", updatesLogController.create);
router.get("/updatesLog", updatesLogController.getAll);
router.get("/updatesLog/:id", updatesLogController.getById);
router.patch("/updatesLog/:id", updatesLogController.updateById);
router.delete("/updatesLog/:id", updatesLogController.deleteById);

module.exports = router;
