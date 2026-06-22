const Car = require("../models/Car");

const getCars = async (req, res) => {
  try {
    const { brand, maxPrice, fuelType, seats, location } = req.query;
    let filter = {};

    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (maxPrice) filter.pricePerDay = { $lte: Number(maxPrice) };
    if (fuelType) filter.fuelType = fuelType;
    if (seats) filter.seats = Number(seats);
    if (location) filter.location = { $regex: location, $options: "i" };

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    const { carName, brand, model, pricePerDay, image, seats, fuelType, location } = req.body;
    if (!carName || !brand || !model || !pricePerDay || !location)
      return res.status(400).json({ message: "Please fill all required fields" });
    const car = await Car.create({ carName, brand, model, pricePerDay, image, seats, fuelType, location });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    car.carName = req.body.carName || car.carName;
    car.brand = req.body.brand || car.brand;
    car.model = req.body.model || car.model;
    car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
    car.image = req.body.image || car.image;
    car.seats = req.body.seats || car.seats;
    car.fuelType = req.body.fuelType || car.fuelType;
    car.location = req.body.location || car.location;
    car.status = req.body.status || car.status;
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    await car.deleteOne();
    res.json({ message: "Car removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { getCars, getCarById, addCar, updateCar, deleteCar };