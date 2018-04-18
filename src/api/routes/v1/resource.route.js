const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/resource.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createResource , updateResource} = require('../../validations/resource.validation');

const router = express.Router();


  /**
   * @api {post} v1/resource/create  Resource
   * @apiDescription Create Resource
   * @apiVersion 1.0.0
   * @apiName CreateResource
   * @apiGroup Resource
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name     			Resource's name
   *
   * @apiSuccess {String}  name       Resource's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createResource), controller.create);



  /**
   * @api {get} v1/resource/view/:id Resource View
   * @apiDescription Get Resource
   * @apiVersion 1.0.0
   * @apiName ViewResource
   * @apiGroup Resource
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/resource/index Resources List
   * @apiDescription Get Resources List
   * @apiVersion 1.0.0
   * @apiName ResourcesList
   * @apiGroup Resource
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index')
   .get(authorize(), controller.index);

  

  /**
   * @api {patch} v1/resource/update/:id Resource
   * @apiDescription update Resource
   * @apiVersion 1.0.0
   * @apiName UpdateResource
   * @apiGroup Resource
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           Resource's name
   *
   * @apiSuccess {String}  name       Resource's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateResource), controller.update);



  /**
   * @api {delete} v1/resource/delete/:id Resource
   * @apiDescription delete Resource
   * @apiVersion 1.0.0
   * @apiName DeleteResource
   * @apiGroup Resource
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