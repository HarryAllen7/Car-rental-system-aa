const Booking = require("../models/Bookings");
const Car = require("../models/Car");

const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    if (!carId || !startDate || !endDate)
      return res.status(400).json({ message: "Please provide car and dates" });

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.status !== "available")
      return res.status(400).json({ message: "This car is not available right now" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start)
      return res.status(400).json({ message: "End date must be after start date" });

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = days * car.pricePerDay;

    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      startDate: start,
      endDate: end,
      totalAmount,
      status: "pending",
    });

    car.status = "booked";
    await car.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("carId", "carName brand model image pricePerDay")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized to cancel this booking" });

    booking.status = "cancelled";
    await booking.save();

    const car = await Car.findById(booking.carId);
    if (car) { car.status = "available"; await car.save(); }

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("carId", "carName brand model")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = "confirmed";
    await booking.save();
    res.json({ message: "Booking approved", booking });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getAllBookings, approveBooking };