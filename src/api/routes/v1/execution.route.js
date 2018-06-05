const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/execution.controller');
const {authorize, ADMIN, LOGGED_USER} = require('../../middlewares/auth');
const { createExecution } = require('../../validations/execution.validation');

const router = express.Router();

/**
 * @api {post} v1/execution/create execution
 * @apiDescription Create execution
 * @apiVersion 1.0.0
 * @apiName createexecution
 * @apiGroup execution
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			execution's name
 *
 * @apiSuccess {String}  name       execution's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(), validate(createExecution), controller.create);

module.exports = router;