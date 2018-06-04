const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/communication.controller');
const {authorize, ADMIN, LOGGED_USER} = require('../../middlewares/auth');
const {createCommunication, updateProject} = require('../../validations/communication.validation');

const router = express.Router();

/**
 * @api {post} v1/communication/create communication
 * @apiDescription Create communication
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


module.exports = router;