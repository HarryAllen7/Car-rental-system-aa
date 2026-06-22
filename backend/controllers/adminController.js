const User = require("../models/User");
const Car = require("../models/Car");
const Booking = require("../models/Bookings");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    res.json({ totalUsers, totalCars, totalBookings, pendingBookings });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { getDashboardStats, getAllUsers };