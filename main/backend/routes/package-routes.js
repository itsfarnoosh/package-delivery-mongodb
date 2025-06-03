/**
 * Router for handling package-related requests.
 * 
 * @module packageRouter
 */

const express = require('express');
const packageController = require('../controllers/package-controller');

const router = express.Router();
const studentPath = "/33391629/Farnoush";
const apiPath = "/33391629/api/v1";

/**
 * GET endpoint to list all packages (renders HTML).
 * 
 * @name GET /33391629/Farnoush/packages
 * @function
 * @memberof module:packageRouter
 */
router.get(`${studentPath}/packages`, packageController.renderListPackagesPage);

/**
 * GET endpoint to render the "Add Package" page.
 * 
 * @name GET /33391629/Farnoush/addPackage
 * @function
 * @memberof module:packageRouter
 */
router.get(`${studentPath}/addPackage`, packageController.renderAddPackagePage);

/**
 * POST endpoint to add a package via HTML form.
 * 
 * @name POST /33391629/Farnoush/addPackage
 * @function
 * @memberof module:packageRouter
 */
router.post(`${studentPath}/addPackage`, packageController.addPackageForm);

/**
 * GET endpoint to render the "Delete Package" page.
 * 
 * @name GET /33391629/Farnoush/delete_package
 * @function
 * @memberof module:packageRouter
 */
router.get(`${studentPath}/delete_package`, packageController.renderDeletePackagePage);

/**
 * GET endpoint to delete a package by custom ID (form-based).
 * 
 * @name GET /33391629/Farnoush/delete_package_by_id
 * @function
 * @memberof module:packageRouter
 */
router.get(`${studentPath}/delete_package_by_id`, packageController.deletePackageByCustomId);

/**
 * GET endpoint to handle invalid data.
 * 
 * @name GET /33391629/Farnoush/invalidData
 * @function
 * @memberof module:packageRouter
 */
router.get(`${studentPath}/invalidData`, packageController.handleInvalidData);

/**
 * GET API endpoint to list all packages in JSON format.
 * 
 * @name GET /33391629/api/v1/packages
 * @function
 * @memberof module:packageRouter
 */
router.get(`${apiPath}/packages`, packageController.getAllPackages);

/**
 * POST API endpoint to add a new package via JSON.
 * 
 * @name POST /33391629/api/v1/packages/add
 * @function
 * @memberof module:packageRouter
 */
router.post(`${apiPath}/packages/add`, packageController.addPackage);

/**
 * DELETE API endpoint to delete a package by ID.
 * 
 * @name DELETE /33391629/api/v1/packages/delete/:id
 * @function
 * @memberof module:packageRouter
 */
router.delete(`${apiPath}/packages/delete/:id`, packageController.deletePackageById);

/**
 * PUT API endpoint to update the package destination by ID.
 * 
 * @name PUT /33391629/api/v1/packages/update
 * @function
 * @memberof module:packageRouter
 */
router.put(`${apiPath}/packages/update`, packageController.updatePackageDestination);

module.exports = router;
