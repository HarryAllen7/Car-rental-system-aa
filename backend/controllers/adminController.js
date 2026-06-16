const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');

exports.getDashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalCars = await Car.countDocuments();
  const totalBookings = await Booking.countDocuments();
  res.json({ totalUsers, totalCars, totalBookings });
};