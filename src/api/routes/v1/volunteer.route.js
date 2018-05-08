const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/volunteer.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createVolunteer , updateVolunteer} = require('../../validations/volunteer.validation');

const router = express.Router();


  /**
   * @api {post} v1/volunteer/create  Volunteer
   * @apiDescription Create Volunteer
   * @apiVersion 1.0.0
   * @apiName CreateVolunteer
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name     			Volunteer's name
   *
   * @apiSuccess {String}  name       Volunteer's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createVolunteer), controller.create);



  /**
   * @api {get} v1/volunteer/view/:id Volunteer View
   * @apiDescription Get Volunteer
   * @apiVersion 1.0.0
   * @apiName ViewVolunteer
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/volunteer/index Volunteers List
   * @apiDescription Get Volunteers List
   * @apiVersion 1.0.0
   * @apiName VolunteersList
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index')
   .get(authorize(), controller.index);

  

  /**
   * @api {patch} v1/volunteer/update/:id Volunteer
   * @apiDescription update Volunteer
   * @apiVersion 1.0.0
   * @apiName UpdateVolunteer
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           Volunteer's name
   *
   * @apiSuccess {String}  name       Volunteer's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateVolunteer), controller.update);



  /**
   * @api {delete} v1/volunteer/delete/:id Volunteer
   * @apiDescription delete Volunteer
   * @apiVersion 1.0.0
   * @apiName DeleteVolunteer
   * @apiGroup Volunteer
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
   * @api {post} v1/volunteer/resend-invitation Resend Invitation
   * @apiDescription resend invitation to Volunteer
   * @apiVersion 1.0.0
   * @apiName Resend Volunteer
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   * 
   * @apiSuccess {Boolean}  success true       
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/resend-invitation')
   .post(authorize(), controller.resendInvitation);


  /**
   * @api {get} v1/volunteer/find-user/:id Find User
   * @apiDescription Find User
   * @apiVersion 1.0.0
   * @apiName Find User
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   * 
   * @apiSuccess {Boolean}  success true       
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/find-user/:id')
   .get(controller.findUser);


  /**
   * @api {post} v1/volunteer/accept-invitation/:id Accept Invitation
   * @apiDescription accept invitation
   * @apiVersion 1.0.0
   * @apiName Accept Invitation
   * @apiGroup Volunteer
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   * 
   * @apiSuccess {Boolean}  success true       
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/accept-invitation/:id')
   .post(controller.acceptInvitation);


   module.exports = router;