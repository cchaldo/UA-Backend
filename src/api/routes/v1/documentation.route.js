const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/documentation.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {createDocuments, updateDocuments} = require('../../validations/documentation.validation');

const router = express.Router();

const multer = require('multer');

// to store file names
let file_name_array = [];

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/activity_stuff/')
    },

    filename: function (req, file, cb) {

        if (req.body.attachedFiles == null) {
            file_name_array = [];
        }

        let ext = file.originalname.split(".");
        ext = ext[ext.length - 1];

        const filename = Date.now() + `.${ext}`;

        file_name_array.push(filename);

        req.body.attachedFiles = file_name_array;
        cb(null, filename);

    },


})

const upload = multer({ storage: storage }).array('attachments');


/**
 * @api {post} v1/documentation/create Documentation Create
 * @apiDescription Create documentation
 * @apiVersion 1.0.0
 * @apiName createdocumentation
 * @apiGroup documentation
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name     			documentation's name
 *
 * @apiSuccess {String}  name       documentation's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/create')
    .post(authorize(),upload ,validate(createDocuments), controller.create);

/**
 * @api {get} v1/documentation/index Documentation List
 * @apiDescription Get documentation List
 * @apiVersion 1.0.0
 * @apiName documentationList
 * @apiGroup documentation
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/index')
    .get(authorize(), controller.index);


/**
 * @api {patch} v1/documentation/update/:id Documentation Update
 * @apiDescription update documentation Update
 * @apiVersion 1.0.0
 * @apiName Updatedocumentation
 * @apiGroup documentation
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiParam  {String}             name           documentation's name
 *
 * @apiSuccess {String}  name       documentation's name
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/update/:id')
    .patch(authorize(), validate(updateDocuments), controller.update);


/**
 * @api {delete} v1/documentation/delete/:id Documentation Delete
 * @apiDescription delete documentation Delete
 * @apiVersion 1.0.0
 * @apiName Deletedocumentation
 * @apiGroup documentation
 * @apiPermission admin
 *
 * @apiHeader {String} Athorization  User's access token
 *
 * @apiSuccess {Boolean}  success true
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
router
    .route('/delete/:id')
    .delete(authorize(), controller.delete);

/**
  * @api {get} v1/documentation/view/:id Documentation View
  * @apiDescription Get documentation Delete
  * @apiVersion 1.0.0
  * @apiName Viewdocumentation
  * @apiGroup documentation
  * @apiPermission admin
  *
  * @apiHeader {String} Athorization  User's access token
  *
  * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
  */
router
    .route('/view/:id')
    .get(authorize(), controller.view);


module.exports = router;