const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/role.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createRole, updateRole} = require('../../validations/role.validation');

const router = express.Router();


  /**
   * @api {post} v1/role/create  Role
   * @apiDescription Create Role
   * @apiVersion 1.0.0
   * @apiName CreateRole
   * @apiGroup Role
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name     			Role's name
   *
   * @apiSuccess {String}  name       Role's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createRole), controller.create);



  /**
   * @api {get} v1/role/view/:id Role View
   * @apiDescription Get Role
   * @apiVersion 1.0.0
   * @apiName ViewRole
   * @apiGroup Role
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/role/index Roles List
   * @apiDescription Get Roles List
   * @apiVersion 1.0.0
   * @apiName RolesList
   * @apiGroup Role
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index')
   .get(authorize(), controller.index);

  

  /**
   * @api {patch} v1/role/update/:id Role
   * @apiDescription update Role
   * @apiVersion 1.0.0
   * @apiName UpdateRole
   * @apiGroup Role
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           Role's name
   *
   * @apiSuccess {String}  name       Role's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateRole), controller.update);



  /**
   * @api {delete} v1/role/delete/:id Role
   * @apiDescription delete Role
   * @apiVersion 1.0.0
   * @apiName DeleteRole
   * @apiGroup Role
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