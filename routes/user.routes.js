const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/user", userController.createUser);
router.get("/user", userController.getAll);
router.get("/user/:id", userController.getById);
router.patch("/user/:id", userController.updateById);
router.delete("/user/:id", userController.deleteById);

module.exports = router;
