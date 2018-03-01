const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/profile.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();


  /**
   * @api {get} v1/profile/create User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup UserProfile
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             firstName     			User's firstName
   * @apiParam  {String}             lastName     			User's lastName
   * @apiParam  {String}             city     					User's city
   * @apiParam  {String}             howToContribute    User's howToContribute
   * @apiParam  {String}             availability     	User's availability
   * @apiParam  {String}             noCriminal     		User's noCriminal
   * @apiParam  {String}             noMedConditions    User's noMedConditions
   * @apiParam  {File/Image}         picture     				User's picture
   *
   * @apiSuccess {String}  firstName       User's firstName
   * @apiSuccess {String}  lastName      User's lastName
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
   // console.log(authorize(LOGGED_USER));
	router.route('/create').post( authorize(), controller.create);

	module.exports = router;