const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/execution.controller');
const {authorize, ADMIN, LOGGED_USER} = require('../../middlewares/auth');
const {createExecution, updateExecution} = require('../../validations/execution.validation');

const router = express.Router();

/**
 * @api {post} v1/execution/create Execution Create
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

/**
 * @api {get} v1/execution/index Execution List
 * @apiDescription Get execution List
 * @apiVersion 1.0.0
 * @apiName executionList
 * @apiGroup execution
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/index/:projectId')
    .get(authorize(), controller.index);


/**
 * @api {patch} v1/execution/update/:id Execution Update
 * @apiDescription update execution Update
 * @apiVersion 1.0.0
 * @apiName Updateexecution
 * @apiGroup execution
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           execution's name
 *
 * @apiSuccess {String}  name       execution's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/update/:id')
    .patch(authorize(), validate(updateExecution), controller.update);


/**
 * @api {delete} v1/execution/delete/:id Execution Delete
 * @apiDescription delete execution Delete
 * @apiVersion 1.0.0
 * @apiName DeleteExecution
 * @apiGroup execution
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiSuccess {Boolean}  success true
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/delete/:id')
    .delete(authorize(), controller.delete);

/**
  * @api {get} v1/execution/view/:id Execution View
  * @apiDescription Get execution Delete
  * @apiVersion 1.0.0
  * @apiName Viewexecution
  * @apiGroup execution
  * @apiPermission admin
  *
  * @apiHeader {String} Athorization  User's access token
  *
  * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
  */
router
    .route('/view/:id')
    .get(authorize(), controller.view);


module.exports = router;