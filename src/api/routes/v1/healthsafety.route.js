const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/healthSafety.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createHealthSafety, updateHealthSafety} = require('../../validations/healthSafety.validation');

const router = express.Router();

/**
 * @api {post} v1/healthSafety/create HealthSafety Create
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
/**
 * @api {get} v1/healthSafety/index HealthSafety List
 * @apiDescription Get HealthSafety List
 * @apiVersion 1.0.0
 * @apiName HealthSafetyList
 * @apiGroup HealthSafety
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
* @api {patch} v1/healthsafety/update/:id HealthSafety Update
* @apiDescription update healthsafety Update
* @apiVersion 1.0.0
* @apiName UpdateHealthSafety
* @apiGroup HealthSafety
* @apiPermission admin
*
* @apiHeader {String} Athorization  User's access token
*
* @apiParam  {String}             name           HealthSafety's name
*
* @apiSuccess {String}  name       HealthSafety's name
*
* @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
*/
router.route('/update/:id')
    .patch(authorize(), validate(updateHealthSafety), controller.update);
/**
 * @api {delete} v1/healthsafety/delete/:id HealthSafety Delete
 * @apiDescription delete healthsafety Delete
 * @apiVersion 1.0.0
 * @apiName DeleteHealthSafety
 * @apiGroup HealthSafety
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
  * @api {get} v1/healthsafety/view/:id HealthSafety View
  * @apiDescription Get HealthSafety Delete
  * @apiVersion 1.0.0
  * @apiName ViewHealthSafety
  * @apiGroup HealthSafety
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