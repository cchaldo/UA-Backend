const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/resources.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { createResources, updateResources } = require('../../validations/resources.validation');

const router = express.Router();

/**
 * @api {post} v1/resources/create Resources Create
 * @apiDescription Create resources
 * @apiVersion 1.0.0
 * @apiName createresources
 * @apiGroup resources
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			resources's name
 *
 * @apiSuccess {String}  name       resources's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(), validate(createResources), controller.create);

/**
 * @api {get} v1/resources/index Resources List
 * @apiDescription Get resources List
 * @apiVersion 1.0.0
 * @apiName resourcesList
 * @apiGroup resources
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
 * @api {patch} v1/resources/update/:id Resources Update
 * @apiDescription update resources Update
 * @apiVersion 1.0.0
 * @apiName Updateresources
 * @apiGroup resources
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           resources's name
 *
 * @apiSuccess {String}  name       resources's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/update/:id')
    .patch(authorize(), validate(updateResources), controller.update);


/**
 * @api {delete} v1/resources/delete/:id Resources Delete
 * @apiDescription delete resources Delete
 * @apiVersion 1.0.0
 * @apiName Deleteresources
 * @apiGroup resources
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
  * @api {get} v1/resources/view/:id Resources View
  * @apiDescription Get resources Delete
  * @apiVersion 1.0.0
  * @apiName Viewresources
  * @apiGroup resources
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