const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/skill.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createSkill,updateSkill} = require('../../validations/skill.validation');

const router = express.Router();


  /**
   * @api {post} v1/skill/create  Skill
   * @apiDescription Create Skill
   * @apiVersion 1.0.0
   * @apiName CreateSkill
   * @apiGroup Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           SKill's name
   * @apiParam  {String}             categoryId     CategoryId will come from the skillCategories api.
   *
   * @apiSuccess {String}  name       Skill's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createSkill), controller.create);



  /**
   * @api {get} v1/skill/view/:id Skill View
   * @apiDescription Get Skill
   * @apiVersion 1.0.0
   * @apiName ViewSkill
   * @apiGroup Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/skill/index Skills List
   * @apiDescription Get Skills List
   * @apiVersion 1.0.0
   * @apiName SkillsList
   * @apiGroup Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index')
   .get(authorize(), controller.index);

  



  /**
   * @api {patch} v1/skill/update/:id Skill
   * @apiDescription update skill
   * @apiVersion 1.0.0
   * @apiName UpdateSkill
   * @apiGroup Skill
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           SKill's name
   *
   * @apiSuccess {String}  name       Skill's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateSkill), controller.update);


  

  /**
   * @api {delete} v1/skill/delete/:id Skill
   * @apiDescription delete skill
   * @apiVersion 1.0.0
   * @apiName DeleteSkill
   * @apiGroup Skill
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