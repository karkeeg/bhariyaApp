const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Load = require('../models/Load');

dotenv.config();

const loads = [
    {
        origin: "Kathmandu",
        destination: "Pokhara",
        weight: 500,
        vehicleTypeRequired: "Pickup Truck",
        price: 15000,
        status: "PENDING"
    },
    {
        origin: "Biratnagar",
        destination: "Kathmandu",
        weight: 1200,
        vehicleTypeRequired: "Heavy Truck",
        price: 35000,
        status: "PENDING"
    },
    {
        origin: "Lalitpur",
        destination: "Bhaktapur",
        weight: 100,
        vehicleTypeRequired: "Van",
        price: 2500,
        status: "PENDING"
    },
    {
        origin: "Chitwan",
        destination: "Butwal",
        weight: 800,
        vehicleTypeRequired: "Mini Truck",
        price: 12000,
        status: "PENDING"
    },
    {
        origin: "Hetauda",
        destination: "Kathmandu",
        weight: 2000,
        vehicleTypeRequired: "Container Truck",
        price: 45000,
        status: "PENDING"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB for seeding...');

        await Load.deleteMany();
        console.log('Cleared existing loads.');

        await Load.insertMany(loads);
        console.log('DB Seeded Successfully!');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
