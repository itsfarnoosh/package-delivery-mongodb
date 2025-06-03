const mongoose = require("mongoose");
/**
 * Mongoose schema for the Driver model.
 * 
 * @typedef {Object} Driver
 * @property {String} driver_id - A unique identifier for the driver, auto-generated using a custom format (e.g., "D12-62-ABC").
 * @property {String} driver_name - The name of the driver. Must contain only alphabets and spaces.
 * @property {String} driver_department - The department of the driver. Must be one of ["Food", "Furniture", "Electronic"].
 * @property {String} driver_licence - The driver's license number. Must be alphanumeric and exactly 5 characters long.
 * @property {Boolean} driver_isActive - Indicates whether the driver is currently active.
 * @property {Date} driver_createdAt - The date and time when the driver record was created. Defaults to the current date and time.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} assigned_packages - An array of ObjectIDs referencing the 'Package' model for the packages assigned to this driver.
 */
const driverSchema = new mongoose.Schema({
    driver_id: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            const randomDigits = Math.floor(10 + Math.random() * 90);
            const randomLetters = Array.from({ length: 3 }, () =>
                String.fromCharCode(65 + Math.floor(Math.random() * 26))
            ).join('');
            return `D${randomDigits}-62-${randomLetters}`;
        },
    },
    driver_name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: "Driver name must contain only alphabets and spaces.",
        },
    },
    driver_department: {
        type: String,
        required: true,
        enum: ["Food", "Furniture", "Electronic"],
    },
    driver_licence: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]{5}$/.test(value);
            },
            message: "Driver licence must be alphanumeric and exactly 5 characters long.",
        },
    },
    driver_isActive: {
        type: Boolean,
        required: true,
    },
    driver_createdAt: {
        type: Date,
        default: Date.now,
    },
    assigned_packages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package', // Make sure this is the correct model reference
        },
    ],
});

module.exports = mongoose.model("Driver", driverSchema);
