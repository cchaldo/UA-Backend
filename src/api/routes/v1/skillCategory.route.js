const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/skillCategory.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createSkillCategory,updateSkillCategory} = require('../../validations/skillCategory.validation');

const router = express.Router();


  /**
   * @api {post} v1/skillCategory/create  SkillCategory
   * @apiDescription Create SkillCategory
   * @apiVersion 1.0.0
   * @apiName CreateSkillCategory
   * @apiGroup SkillCategory
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name     			SKill Category name
   *
   * @apiSuccess {String}  name       Skill Category name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
	router.route('/create')
   .post(authorize(), validate(createSkillCategory), controller.create);



  /**
   * @api {get} v1/skillCategory/view/:id Skill View
   * @apiDescription Get SkillCategory
   * @apiVersion 1.0.0
   * @apiName ViewSkillCategory
   * @apiGroup SkillCategory
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/view/:id')
   .get(authorize(), controller.view);

  
  /**
   * @api {get} v1/skillCategory/index Skills List
   * @apiDescription Get SkillCategories List
   * @apiVersion 1.0.0
   * @apiName SkillsListCategory
   * @apiGroup SkillCategory
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/index')
   .get(authorize(), controller.index);

  



  /**
   * @api {patch} v1/skillCategory/update/:id Skill
   * @apiDescription update skill category
   * @apiVersion 1.0.0
   * @apiName UpdateSkillCategory
   * @apiGroup SkillCategory
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam  {String}             name           SKill Category's name
   *
   * @apiSuccess {String}  name       Skill Category's name
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  router.route('/update/:id')
   .patch(authorize(), validate(updateSkillCategory), controller.update);


  

  /**
   * @api {delete} v1/skillCategory/delete/:id Skill
   * @apiDescription delete skill category
   * @apiVersion 1.0.0
   * @apiName DeleteSkillCategory
   * @apiGroup SkillCategory
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