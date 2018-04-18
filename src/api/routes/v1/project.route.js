const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/project.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { createProject, updateProject } = require('../../validations/project.validation');

const router = express.Router();


/**
 * @api {post} v1/project/create  Project
 * @apiDescription Create Project
 * @apiVersion 1.0.0
 * @apiName CreateProject
 * @apiGroup Project
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			Project's name
 *
 * @apiSuccess {String}  name       Project's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/create')
    .post(authorize(), validate(createProject), controller.create);



/**
 * @api {get} v1/project/view/:id Project View
 * @apiDescription Get Project
 * @apiVersion 1.0.0
 * @apiName ViewProject
 * @apiGroup Project
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/view/:id')
    .get(authorize(), controller.view);


/**
 * @api {get} v1/project/index Projects List
 * @apiDescription Get Projects List
 * @apiVersion 1.0.0
 * @apiName ProjectsList
 * @apiGroup Project
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/index')
    .get(authorize(), controller.index);



/**
 * @api {patch} v1/project/update/:id Project
 * @apiDescription update Project
 * @apiVersion 1.0.0
 * @apiName UpdateProject
 * @apiGroup Project
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           Project's name
 *
 * @apiSuccess {String}  name       Project's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/update/:id')
    .patch(authorize(), validate(updateProject), controller.update);



/**
 * @api {delete} v1/project/delete/:id Project
 * @apiDescription delete Project
 * @apiVersion 1.0.0
 * @apiName DeleteProject
 * @apiGroup Project
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


module.exports = router;