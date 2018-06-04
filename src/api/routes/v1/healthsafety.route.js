const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/healthSafety.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { createHealthSafety } = require('../../validations/healthSafety.validation');

const router = express.Router();

/**
 * @api {post} v1/healthSafety/create healthSafety
 * @apiDescription Create healthSafety
 * @apiVersion 1.0.0
 * @apiName createhealthSafety
 * @apiGroup healthSafety
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			healthSafety's name
 *
 * @apiSuccess {String}  name       healthSafety's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(), validate(createHealthSafety), controller.create);


module.exports = router;