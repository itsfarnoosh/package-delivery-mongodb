const mongoose = require("mongoose");

/**
 * Mongoose schema for the Package model.
 * 
 * @typedef {Object} Package
 * @property {String} package_id - A unique identifier for the package, auto-generated using a custom format (e.g., "PAB-123").
 * @property {String} package_title - The title of the package. Must be alphanumeric and between 3 to 15 characters.
 * @property {Number} package_weight - The weight of the package. Must be a positive, non-zero number.
 * @property {String} package_destination - The destination of the package. Must be alphanumeric and between 5 to 15 characters.
 * @property {String} [description] - A brief description of the package. Must not exceed 30 characters.
 * @property {Boolean} isAllocated - Indicates whether the package is allocated to a driver.
 * @property {mongoose.Schema.Types.ObjectId} [driver_id] - An ObjectId referencing the assigned driver, linked to the 'Driver' model.
 * @property {Date} createdAt - The date and time when the package record was created. Defaults to the current date and time.
 */
const packageSchema = mongoose.Schema({
    package_id: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            const randomLetters = String.fromCharCode(
                65 + Math.floor(Math.random() * 26),
                65 + Math.floor(Math.random() * 26)
            );
            const randomNumbers = Math.floor(100 + Math.random() * 900);
            return `P${randomLetters}-${randomNumbers}`;
        },
    },
    package_title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9\s]{3,15}$/.test(value); // Alphanumeric and between 3 to 15 characters
            },
            message: "Package title must be alphanumeric and between 3 to 15 characters.",
        },
    },
    package_weight: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0; // Must be a positive, non-zero number
            },
            message: "Package weight must be a positive, non-zero number.",
        },
    },
    package_destination: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9\s]{5,15}$/.test(value); // Alphanumeric and between 5 to 15 characters
            },
            message: "Package destination must be alphanumeric and between 5 to 15 characters.",
        },
    },
    description: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length <= 30; // Maximum length of 30 characters
            },
            message: "Description must not exceed 30 characters.",
        },
    },
    isAllocated: {
        type: Boolean,
        required: true,
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId, // Should use ObjectId to reference the driver
        ref: 'Driver', // Reference to the Driver schema
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Package model
module.exports = mongoose.model("Package", packageSchema);
