const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/profile.controller');
const {createProfile,updateProfile} = require('../../validations/profile.validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const router = express.Router();

const multer      = require('multer');

const storage     = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/user_images/')
  },
  filename: function (req, file, cb) {
   
   let ext =  file.originalname.split(".");
   ext = ext[ext.length - 1];
   const filename = Date.now() + `.${ext}`;
   req.body.picture = filename;
    cb(null, filename);
  }
})
 
const upload = multer({ storage: storage }).single('picture');
    

  /**
   * @api {post} v1/profile/create User Profile
   * @apiDescription Create user profile
   * @apiVersion 1.0.0
   * @apiName CreateProfile
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
	router.route('/create')
   .post(authorize(), upload, validate(createProfile), controller.create);

	

  /**
   * @api {patch} v1/profile/update/:id User Profile
   * @apiDescription update user profile
   * @apiVersion 1.0.0
   * @apiName UpdateProfile
   * @apiGroup UserProfile
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             firstName          User's firstName
   * @apiParam  {String}             lastName           User's lastName
   * @apiParam  {String}             city               User's city
   * @apiParam  {String}             howToContribute    User's howToContribute
   * @apiParam  {String}             availability       User's availability
   * @apiParam  {String}             noCriminal         User's noCriminal
   * @apiParam  {String}             noMedConditions    User's noMedConditions
   * @apiParam  {File/Image}         picture            User's picture
   *
   * @apiSuccess {String}  firstName       User's firstName
   * @apiSuccess {String}  lastName      User's lastName
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), upload, validate(updateProfile), controller.update);



  /**
   * @api {get} v1/profile/view User Profile View
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName ViewProfile
   * @apiGroup UserProfile
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  

   module.exports = router;