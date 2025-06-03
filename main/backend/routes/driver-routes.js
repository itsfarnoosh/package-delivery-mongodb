/**
 * Router for handling driver-related requests.
 * 
 * @module driverRouter
 */

const express = require("express");
const driverController = require("../controllers/driver-controller");

const router = express.Router();
const studentPath = "/33391629/Farnoush";
const apiPath = "/33391629/api/v1";

/**
 * GET endpoint to list all drivers (renders HTML).
 * 
 * @name GET /33391629/Farnoush/drivers
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/drivers`, driverController.renderListDriverPage);

/**
 * GET endpoint to render the "Add Driver" page.
 * 
 * @name GET /33391629/Farnoush/addDriver
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/addDriver`, driverController.renderAddDriverPage);

/**
 * POST endpoint to add a new driver via HTML form.
 * 
 * @name POST /33391629/Farnoush/addDriver
 * @function
 * @memberof module:driverRouter
 */
router.post(`${studentPath}/addDriver`, driverController.addDriverForm);

/**
 * GET endpoint to render the "Delete Driver" page.
 * 
 * @name GET /33391629/Farnoush/delete_driver
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/delete_driver`, driverController.renderDeleteDriverPage);

/**
 * GET endpoint to delete a driver by custom ID.
 * 
 * @name GET /33391629/Farnoush/delete_driver_by_id
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/delete_driver_by_id`, driverController.deleteDriverByCustomId);

/**
 * GET endpoint to render the "List Drivers by Department" page.
 * 
 * @name GET /33391629/Farnoush/department
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/department`, driverController.renderDriversByDepartmentPage);

/**
 * POST endpoint to filter drivers by department.
 * 
 * @name POST /33391629/Farnoush/department
 * @function
 * @memberof module:driverRouter
 */
router.post(`${studentPath}/department`, driverController.filterDriversByDepartment);

/**
 * GET endpoint to handle invalid data.
 * 
 * @name GET /33391629/Farnoush/invalidData
 * @function
 * @memberof module:driverRouter
 */
router.get(`${studentPath}/invalidData`, driverController.handleInvalidData);

/**
 * GET API endpoint to list all drivers in JSON format.
 * 
 * @name GET /33391629/api/v1/drivers
 * @function
 * @memberof module:driverRouter
 */
router.get(`${apiPath}/drivers`, driverController.getAllDrivers);

/**
 * POST API endpoint to add a new driver via JSON.
 * 
 * @name POST /33391629/api/v1/drivers/add
 * @function
 * @memberof module:driverRouter
 */
router.post(`${apiPath}/drivers/add`, driverController.addDriver);

/**
 * DELETE API endpoint to delete a driver by ID.
 * 
 * @name DELETE /33391629/api/v1/drivers/delete/:id
 * @function
 * @memberof module:driverRouter
 */
router.delete(`${apiPath}/drivers/delete/:id`, driverController.deleteDriverById);

/**
 * PUT API endpoint to update driver license and department by MongoDB ID.
 * 
 * @name PUT /33391629/api/v1/drivers/update
 * @function
 * @memberof module:driverRouter
 */
router.put(`${apiPath}/drivers/update`, driverController.updateDriverById);

module.exports = router;
