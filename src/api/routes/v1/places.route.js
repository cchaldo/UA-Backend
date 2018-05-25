const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/places.controller');
const {authorize, ADMIN, LOGGED_USER} = require('../../middlewares/auth');
const {createPlaces, updatePlaces} = require('../../validations/places.validation');

const router = express.Router();

/**
 * @api {post} v1/places/create  places
 * @apiDescription Create places
 * @apiVersion 1.0.0
 * @apiName Createplaces
 * @apiGroup places
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			places's name
 *
 * @apiSuccess {String}  name       places's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(), validate(createPlaces), controller.create);



/**
 * @api {patch} v1/Places/update/:id Places
 * @apiDescription update Places
 * @apiVersion 1.0.0
 * @apiName UpdatePlaces
 * @apiGroup Places
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           Places's name
 *
 * @apiSuccess {String}  name       Places's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/update/:id')
    .patch(authorize(), validate(updatePlaces), controller.update);



/**
 * @api {get} v1/Places/index Placess List
 * @apiDescription Get Placess List     
 * @apiVersion 1.0.0
 * @apiName PlacessList
* @apiGroup Places
* @apiPermission admin
*
* @apiHeader {String} Athorization  User's access token
*
* @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
*/


router.route('/view/:id')
.get(authorize(), controller.view);





/**
 * @api {get} v1/places/index places List
 * @apiDescription Get places List
 * @apiVersion 1.0.0
 * @apiName placesList
 * @apiGroup place
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router.route('/index')
    .get(authorize(), controller.index);



    
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