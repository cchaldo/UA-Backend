const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/userSkill.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createUserSkill,updateUserSkill} = require('../../validations/userSkill.validation');

const router = express.Router();


  /**
   * @api {post} v1/userSkill/create  User Skill
   * @apiDescription Create User Skill
   * @apiVersion 1.0.0
   * @apiName CreateUserSkill
   * @apiGroup User Skill
   * @apiPermission admin, user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             skillId          skillId comes from skills 
   * @apiParam  {String}             userId           userId comes from user 
   * @apiParam  {Number}             type             Type always be 1 or 2. if type is 1, it means user have that skill, if type is 2 it means user want that skill 
   * @apiParam  {Number}             rating           rating of user skill, it must be between 1 to 5, 
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createUserSkill), controller.create);



  /**
   * @api {get} v1/userSkill/view/:id User Skill View
   * @apiDescription Get User Skill
   * @apiVersion 1.0.0
   * @apiName ViewUserSkill
   * @apiGroup User Skill
   * @apiPermission admin,user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/userSkill/index/:userId User Skills List
   * @apiDescription Get User Skills List
   * @apiVersion 1.0.0
   * @apiName UserSkillsList
   * @apiGroup User Skill
   * @apiPermission admin, user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index/:userId')
   .get(authorize(), controller.index);

  

  /**
   * @api {patch} v1/userSkill/update/:id User Skill Update
   * @apiDescription update user skill
   * @apiVersion 1.0.0
   * @apiName UpdateUserSkill
   * @apiGroup User Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             skillId          skillId comes from skills 
   * @apiParam  {String}             userId           userId comes from user 
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateUserSkill), controller.update);


 
  /**
   * @api {delete} v1/userSkill/delete/:id User Skill Delete
   * @apiDescription delete user skill
   * @apiVersion 1.0.0
   * @apiName DeleteUserSkill
   * @apiGroup User Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/delete/:id')
   .delete(authorize(), controller.delete);


 
   module.exports = router;