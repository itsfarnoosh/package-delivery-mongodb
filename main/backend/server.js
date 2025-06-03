/**
 * Server setup for the web application.
 * 
 * @module server
 */


const mongoose = require("mongoose");
const express = require("express");
const session = require('express-session'); // Add this line to require express-session

// Import Firebase Admin SDK and initialize it
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json"); // Ensure this is the correct path to your service account file


const path = require("path");
const cors = require("cors"); // Import CORS
const Driver = require("./models/driver"); // Import Driver model
const Package = require("./models/package"); // Import Package model
const User = require('./models/user');
const http = require("http");

const { Server } = require("socket.io");
const textToSpeech = require("@google-cloud/text-to-speech"); // Google Cloud Text-to-Speech client
const { Translate } = require('@google-cloud/translate').v2;// Import Google Translate API
const { Client } = require('@googlemaps/google-maps-services-js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const fs = require("fs");
const util = require("util");


// Initialize the app and server
const app = express();
const server = http.Server(app);
const io = new Server(server, { cors: { origin: '*' } });


// Set up the API key for Google Gemini
const geminiApiKey = "AIzaSyCn8MWAYCDnS6oqcb5Y0v-2sCw-GzKRCCs"; 

// Initialize the GoogleGenerativeAI client
const googleAI = new GoogleGenerativeAI(geminiApiKey);

// Create a configuration object for the generative AI model
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

// Retrieve the generative AI model
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const mapsClient = new Client({});

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore(); // Initialize Firestore



  


const port = 8080;


// Google Cloud client setup
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/nic/Desktop/c2001/2nd year 1st sem/FIT2095 Full stack development /A3/Assignment-3/assignment-3/fit2095project.json"
const client = new textToSpeech.TextToSpeechClient();
const translateClient = new Translate({ key: 'AIzaSyBw40rw7LN6OjVyhGdG32R1if6VyktWHxE' });

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));
  
// Serve the Angular app from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist/your-angular-app-name')))

// Counters for statistics
let statistics = {
    driverCount: 0,
    packageCount: 0,
    createOperations: 0,
    deleteOperations: 0,
    updateOperations: 0,
    retrieveOperations: 0,
};

// Connect to the database
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/A3'); // Replace with your database name
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}


// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    credentials: true // Allow cookies and other credentials if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, './')));


io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle textToSpeech event
    socket.on('textToSpeech', async (text) => {
        console.log('Received text for speech conversion:', text);

        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };

        try {
            // Request Google Cloud Text-to-Speech
            const [response] = await client.synthesizeSpeech(request);
            console.log('Audio content received');

            // Send the audio file (binary data) to the client through WebSocket
            socket.emit('audioFile', response.audioContent);
        } catch (err) {
            console.error('ERROR:', err);
            socket.emit('error', 'Failed to convert text to speech');
        }
    });
});

//handle translation
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle translate description event
  socket.on('translateDescription', async ({ description, targetLanguage }) => {
    console.log(`Received request to translate: ${description} to ${targetLanguage}`);

    try {
      const [translation] = await translateClient.translate(description, targetLanguage);
      console.log('Sending translation:', translation);

      // Send the original text, target language code, and translation back to the client
      socket.emit('translationResponse', {
        originalText: description, // Send the original description
        targetLanguage: targetLanguage, // Send the language code
        translatedDescription: translation, // Send the translated description
      });
    } catch (error) {
      console.error('Error translating description:', error);
      socket.emit('error', 'Translation failed.');
    }
  });
});


// Handle distance calculation for package destination
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('calculateDistance', async (data) => {
    const destination = data.destination;
    const packageId = data.packageId; // Get the package ID from the request

    try {
      // Call Google Maps Distance Matrix API
      const response = await mapsClient.distancematrix({
        params: {
          origins: ['Melbourne, Australia'],
          destinations: [destination],
          key: 'AIzaSyA6GmXDKKFRmfidlHMkuig25rxar9cuHRs', // Ensure the key is passed as a string
        },
      });

      const distanceInKm = response.data.rows[0].elements[0].distance.text;

      // Send the calculated distance along with the packageId back to the client
      socket.emit('distanceCalculated', { distance: distanceInKm, packageId });
    } catch (error) {
      console.error('Error calculating distance:', error);
      socket.emit('error', 'Failed to calculate distance');
    }
  });
});


// API endpoints for Driver
app.get('/33391629/api/v1/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find({}).populate({
            path: 'assigned_packages',
            model: 'Package', // Reference the 'Package' model
            select: 'package_title package_weight package_destination description', // Select the fields you want to return
        });
        res.status(200).json(drivers); // Return drivers with populated package details
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





app.post('/33391629/api/v1/drivers/add', async (req, res) => {
    try {
        const { driver_name, driver_department, driver_licence, driver_isActive } = req.body;
        const newDriver = new Driver({
            driver_name,
            driver_department,
            driver_licence,
            driver_isActive,
        });

        await newDriver.save();
        statistics.createOperations++; // Increment create operations count
        statistics.driverCount++; // Increment driver count
        res.status(200).json({
            id: newDriver._id,
            driver_id: newDriver.driver_id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

// Delete driver and their packages
app.delete('/33391629/api/v1/drivers/delete/:id', async (req, res) => {
    try {
      const driverId = req.params.id; // Get the MongoDB _id from the route parameter
      const driver = await Driver.findById(driverId); // Use driverId here
  
      if (!driver) {
        return res.status(404).json({ message: "Driver not found." });
      }
  
      // Delete associated packages
      await Package.deleteMany({ _id: { $in: driver.assigned_packages } });
  
      // Delete the driver
      await Driver.deleteOne({ _id: driverId });
      statistics.deleteOperations++;
      statistics.driverCount--; // Decrement driver count
      res.status(200).json({ message: "Driver and associated packages deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Update driver details
app.put('/33391629/api/v1/drivers/update/:id', async (req, res) => {
    try {
      const driverId = req.params.id; // Get the MongoDB _id from the request params
      const { driver_licence, driver_department } = req.body; // Get updated fields from the request body
  
      const updatedDriver = await Driver.findByIdAndUpdate(driverId, {
        driver_licence,
        driver_department,
      }, { new: true, runValidators: true });

      statistics.updateOperations++;
      if (!updatedDriver) {
        return res.status(404).json({ message: "Driver not found." });
      }
  
      res.status(200).json({ message: "Driver updated successfully", driver: updatedDriver });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// API endpoints for Package
app.get('/33391629/api/v1/packages', async (req, res) => {
  try {
      const packages = await Package.find({}).populate({
          path: 'driver_id',
          select: 'driver_name driver_department driver_licence' // Populate driver details
      });
      statistics.retrieveOperations++; // Increment retrieve operations count
      res.status(200).json(packages); // Return the packages with populated driver details
  } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors
  }
});


app.post('/33391629/api/v1/packages/add', async (req, res) => {
    try {
      const { package_title, package_weight, package_destination, description, isAllocated, driver_id } = req.body;
      console.log(req.body); // Log incoming request
  
      const driver = await Driver.findById(driver_id);
      if (!driver) {
        console.error("Driver ID not found"); // Log missing driver
        return res.status(404).json({ status: "Driver ID not found" });
      }
  
      const newPackage = new Package({
        package_title,
        package_weight,
        package_destination,
        description,
        isAllocated,
        driver_id,
      });
  
      const savedPackage = await newPackage.save();
  
      if (isAllocated) {
        driver.assigned_packages.push(savedPackage._id);
        await driver.save();
      }
  
      res.status(200).json({ id: savedPackage._id, package_id: savedPackage.package_id });
    } catch (error) {
      console.error("Error adding package:", error); // Log the actual error
      res.status(500).json({ error: error.message });
    }
  });
  
  
app.delete('/33391629/api/v1/packages/delete/:id', async (req, res) => {
    try {
        const packageId = req.params.id; // Get the package ID from the route parameter

        // Find and delete the package by ID
        const deletedPackage = await Package.findByIdAndDelete(packageId);
        if (!deletedPackage) {
            return res.status(404).json({ status: "Package ID not found" }); // Handle not found
        }

        // Remove the package ID from the assigned_packages array of any drivers
        const updateResult = await Driver.updateMany(
            { assigned_packages: packageId },
            { $pull: { assigned_packages: packageId } }
        );

        statistics.deleteOperations++; // Increment delete operations count
        statistics.packageCount--; // Decrement package count
        res.status(200).json({
            acknowledged: updateResult.acknowledged,
            deletedCount: deletedPackage ? 1 : 0,
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

app.put('/33391629/api/v1/packages/update/:id', async (req, res) => {
    try {
        const packageId = req.params.id; // Get the package ID from the route parameter
        const { package_destination, package_title, package_weight } = req.body; // Assuming these are the fields to update

        // Validate the package ID
        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(404).json({ status: "Package ID not found" });
        }

        // Find the package by ID and update it
        const updatedPackage = await Package.findByIdAndUpdate(
            packageId,
            { package_destination, package_title, package_weight }, // Fields to update
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!updatedPackage) {
            return res.status(404).json({ status: "Package ID not found" });
        }
        statistics.updateOperations++;
        res.status(200).json({
            status: "Package updated successfully",
            package: updatedPackage // Return the updated package details
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

// Statistics endpoint
app.get('/33391629/api/v1/statistics', async (req, res) => {
    try {
        res.status(200).json(statistics); // Return the statistics
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reset statistics endpoint
app.post('/33391629/api/v1/statistics/reset', async (req, res) => {
    try {
        // Reset all statistics to 0
        statistics = {
            driverCount: 0,
            packageCount: 0,
            createOperations: 0,
            deleteOperations: 0,
            updateOperations: 0,
            retrieveOperations: 0,
        };
        res.status(200).json({ status: "Statistics reset successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Endpoint for User Signup
app.post('/33391629/api/v1/signup', async (req, res) => {
  const { username, password } = req.body;
  if (username.length < 6 || !/^[a-zA-Z0-9]+$/.test(username) || password.length < 5 || password.length > 10) {
    return res.status(400).json({ error: "Invalid data" });  // Return a proper error with status 400
  }

  try {
    const userSnapshot = await db.collection('users').where('username', '==', username).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ error: "User already exists" });  // Proper 400 error
    }

    await db.collection('users').add({ username, password });
    return res.status(200).json({ message: "Signup successful" });  // Ensure success response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });  // Return server error on exception
  }
});


// API Endpoint for User Login
app.post('/33391629/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userSnapshot = await db.collection('users')
      .where('username', '==', username)
      .where('password', '==', password)
      .get();

    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// API Endpoint for User Logout
app.post('/33391629/api/v1/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});


// Start the server and connect to the database
connect()
    .then(() => server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    }))
    .catch(err => console.error('Database connection error:', err));
