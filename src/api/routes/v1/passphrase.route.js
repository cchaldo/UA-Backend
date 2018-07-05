const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/passphrase.controller');
const { authorize, ADMIN, LOGGED_USER, SUPER_ADMIN } = require('../../middlewares/auth');
const {
  create,
} = require('../../validations/passphrase.validation');

const router = express.Router();


  /**
   * @api {get} v1/passphrase/index List passphrase
   * @apiDescription Get a list of passphrase
   * @apiVersion 1.0.0
   * @apiName Listpassphrase
   * @apiGroup Passphrase
   * @apiPermission superadmin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess {Object[]} passpharase List of passpharase.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated passpharase can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  router.route('/index')
  .get(authorize(SUPER_ADMIN), controller.index)
  
  /**
   * @api {post} v1/passphrase/create Create passphrase
   * @apiDescription Create a new passphrase
   * @apiVersion 1.0.0
   * @apiName Createpassphrase
   * @apiGroup Passphrase
   * @apiPermission superadmin
   *
   * @apiHeader {String} Athorization  passphrase's access token
   *
   * @apiParam  {String}             passphrase     passphrase's value with specifix number of digits
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated passpharases can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  
  router.route('/create')
  .post(authorize(SUPER_ADMIN), validate(create), controller.create);


  /**
   * @api {put} v1/passphrase/delete/:id Delete User
   * @apiDescription Delete a user
   * @apiVersion 1.0.0
   * @apiName Deletepassphrase
   * @apiGroup Passphrase
   * @apiPermission superadmin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated passpharase can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  
  router.route('/delete/:id')
  .put(authorize(SUPER_ADMIN), controller.delete);


module.exports = router;
