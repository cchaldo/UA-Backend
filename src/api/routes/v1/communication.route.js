const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/communication.controller');
const {authorize, ADMIN, LOGGED_USER} = require('../../middlewares/auth');
const { createCommunication, updateCommunication} = require('../../validations/communication.validation');

const router = express.Router();

/**
 * @api {post} v1/communication/create communication Create
 * @apiDescription Create communication Create
 * @apiVersion 1.0.0
 * @apiName createCommunication
 * @apiGroup Communication
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			communication's name
 *
 * @apiSuccess {String}  name       communication's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(), validate(createCommunication), controller.create);



/**
 * @api {get} v1/communication/index Communication List
 * @apiDescription Get Communication List
 * @apiVersion 1.0.0
 * @apiName CommunicationList
 * @apiGroup Communication
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/index/:projectId')
    .get(authorize(), controller.index);



/**
 * @api {patch} v1/communication/update/:id Communication Update
 * @apiDescription update communication Update
 * @apiVersion 1.0.0
 * @apiName UpdateCommunication
 * @apiGroup Communication
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           Communication's name
 *
 * @apiSuccess {String}  name       Communication's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/update/:id')
    .patch(authorize(), validate(updateCommunication), controller.update);



/**
 * @api {delete} v1/communication/delete/:id Communication Delete
 * @apiDescription delete communication Delete
 * @apiVersion 1.0.0
 * @apiName DeleteCommunication
 * @apiGroup Communication
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 * 
 * @apiSuccess {Boolean}  success true       
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/delete/:id')
    .delete(authorize(), controller.delete);


/**
  * @api {get} v1/communication/view/:id Communication View
  * @apiDescription Get Communication Delete
  * @apiVersion 1.0.0
  * @apiName ViewCommunication
  * @apiGroup Communication
  * @apiPermission admin
  *
  * @apiHeader {String} Athorization  User's access token
  *
  * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
  */
router.route('/view/:id')
    .get(authorize(), controller.view);
module.exports = router;