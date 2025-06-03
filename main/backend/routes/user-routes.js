const express = require('express');
const userController = require('../controllers/user-controller'); // Import the user controller

const router = express.Router();
const studentPath = "/33391629/Farnoush";
const apiPath = "/33391629/api/v1";

// Non-API Endpoints (HTML form-based)
router.get(`${studentPath}/signup`, userController.renderSignupPage); // Endpoint to render the "Signup" page
router.post(`${studentPath}/signup`, userController.signup); // Endpoint to handle signup form submission

router.get(`${studentPath}/login`, userController.renderLoginPage); // Endpoint to render the "Login" page
router.post(`${studentPath}/login`, userController.login); // Endpoint to handle login form submission

router.get(`${studentPath}/logout`, userController.logout); // Endpoint to handle user logout

router.get(`${studentPath}/invalidData`, userController.handleInvalidData); // Endpoint to handle invalid data

// API Endpoints (JSON-based)
router.post(`${apiPath}/users/signup`, userController.apiSignup); // API endpoint for user signup
router.post(`${apiPath}/users/login`, userController.apiLogin); // API endpoint for user login
router.get(`${apiPath}/users/logout`, userController.apiLogout); // API endpoint for user logout

module.exports = router;
