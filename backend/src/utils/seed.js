const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Load = require('../models/Load');

dotenv.config();

const loads = [
    // === WITHIN 10km of Kathmandu (27.7172, 85.3240) ===
    {
        origin: "Kathmandu",
        originCoordinates: { type: "Point", coordinates: [85.3240, 27.7172] },
        destination: "Pokhara",
        weight: 500,
        vehicleTypeRequired: "Pickup Truck",
        price: 15000,
        status: "PENDING"
    },
    {
        origin: "Lalitpur",
        originCoordinates: { type: "Point", coordinates: [85.3247, 27.6588] },  // ~6.5km
        destination: "Bhaktapur",
        weight: 100,
        vehicleTypeRequired: "Van",
        price: 2500,
        status: "PENDING"
    },
    {
        origin: "Bhaktapur",
        originCoordinates: { type: "Point", coordinates: [85.4271, 27.6710] },  // ~9km
        destination: "Lalitpur",
        weight: 300,
        vehicleTypeRequired: "Pickup Truck",
        price: 4000,
        status: "PENDING"
    },
    {
        origin: "Kirtipur",
        originCoordinates: { type: "Point", coordinates: [85.2775, 27.6783] },  // ~5.5km
        destination: "Banepa",
        weight: 250,
        vehicleTypeRequired: "Van",
        price: 3500,
        status: "PENDING"
    },

    // === OUTSIDE 10km from Kathmandu ===
    {
        origin: "Biratnagar",
        originCoordinates: { type: "Point", coordinates: [87.2718, 26.4525] },  // ~250km
        destination: "Kathmandu",
        weight: 1200,
        vehicleTypeRequired: "Heavy Truck",
        price: 35000,
        status: "PENDING"
    },
    {
        origin: "Chitwan",
        originCoordinates: { type: "Point", coordinates: [84.4333, 27.6833] },  // ~90km
        destination: "Butwal",
        weight: 800,
        vehicleTypeRequired: "Mini Truck",
        price: 12000,
        status: "PENDING"
    },
    {
        origin: "Hetauda",
        originCoordinates: { type: "Point", coordinates: [85.0333, 27.4167] },  // ~40km
        destination: "Kathmandu",
        weight: 2000,
        vehicleTypeRequired: "Container Truck",
        price: 45000,
        status: "PENDING"
    },
    {
        origin: "Pokhara",
        originCoordinates: { type: "Point", coordinates: [83.9856, 28.2096] },  // ~150km
        destination: "Kathmandu",
        weight: 600,
        vehicleTypeRequired: "Mini Truck",
        price: 18000,
        status: "PENDING"
    },
    {
        origin: "Butwal",
        originCoordinates: { type: "Point", coordinates: [83.4486, 27.7006] },  // ~190km
        destination: "Biratnagar",
        weight: 1500,
        vehicleTypeRequired: "Heavy Truck",
        price: 40000,
        status: "PENDING"
    },
    {
        origin: "Dharan",
        originCoordinates: { type: "Point", coordinates: [87.2846, 26.8121] },  // ~210km
        destination: "Pokhara",
        weight: 900,
        vehicleTypeRequired: "Mini Truck",
        price: 28000,
        status: "PENDING"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB for seeding...');

        await Load.deleteMany();
        await Load.insertMany(loads);
        console.log(`Seeded ${loads.length} loads successfully!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
