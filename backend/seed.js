const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const Car = require("./models/Car");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    const adminExists = await User.findOne({ email: "admin@carrental.com" });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      await User.create({ name: "Admin", email: "admin@carrental.com", password: hashedPassword, role: "admin" });
      console.log("Admin user created -> admin@carrental.com / admin123");
    } else {
      console.log("Admin already exists, skipping");
    }

    const carCount = await Car.countDocuments();
    if (carCount === 0) {
      await Car.insertMany([
        { carName: "Toyota Innova Crysta", brand: "Toyota", model: "2024", pricePerDay: 2500, image: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=500", seats: 7, fuelType: "Diesel", status: "available" },
        { carName: "Maruti Swift", brand: "Maruti Suzuki", model: "2023", pricePerDay: 1200, image: "https://images.unsplash.com/photo-1623869675184-0dbb19233863?w=500", seats: 5, fuelType: "Petrol", status: "available" },
        { carName: "Hyundai Creta", brand: "Hyundai", model: "2024", pricePerDay: 2000, image: "https://images.unsplash.com/photo-1633509817627-5a47b0758a3f?w=500", seats: 5, fuelType: "Petrol", status: "available" },
        { carName: "Honda City", brand: "Honda", model: "2023", pricePerDay: 1800, image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500", seats: 5, fuelType: "Petrol", status: "available" },
        { carName: "Mahindra Thar", brand: "Mahindra", model: "2024", pricePerDay: 3000, image: "https://images.unsplash.com/photo-1669034871417-fed3c5b5b2bf?w=500", seats: 4, fuelType: "Diesel", status: "available" },
      ]);
      console.log("5 sample cars added");
    } else {
      console.log("Cars already exist, skipping");
    }

    console.log("Seeding done!");
    process.exit();
  } catch (error) {
    console.log("Seeding failed: " + error.message);
    process.exit(1);
  }
};

seedData();