const express = require("express");
const router = express.Router();
const { getCars, getCarById, addCar, updateCar, deleteCar } = require("../controllers/carController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", protect, isAdmin, addCar);
router.put("/:id", protect, isAdmin, updateCar);
router.delete("/:id", protect, isAdmin, deleteCar);

module.exports = router;