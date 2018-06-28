const httpStatus = require('http-status');
const Resources = require('../models/resources.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
  try{
    const resourcesObj  = await new Resources(req.body);
    const resources     = await resourcesObj.save();
      res.status(httpStatus.OK);
     
    return res.json({
        resources,
        'message' : 'Saved'
    });
  }
  catch(error){
    return res.json(error);
  }
}

exports.index = async (req, res, next) => {
    try {
        const resources = await Resources.find().where({ projectId: req.params.projectId });

        res.status(httpStatus.OK);
        return res.json({
            success: true,
            resources
        });
    }
    catch (error) {
        return res.json(error);
    }

}

exports.update = async (req, res, next) => {
    try {
        const resources = await Resources.update({ _id: req.params.id }, req.body);

        res.status(httpStatus.OK);
        return res.json({
            success: true,
            resources
        });
    }
    catch (error) {
        return res.json(error);
    }
}

exports.view = async (req, res, next) => {
    try {

        const resources = await Resources.findById(req.params.id);
        res.status(httpStatus.OK);
        return res.json({
            resources,
            success: true,

        })
    } catch (error) {
        return res.json(error)
    }
}

exports.delete = async (req, res, next) => {
    try {

        const resources = await Resources.delete({ _id: req.perams.id }, { status: 0 })

        res.status(httpStatus.OK);
        return res.json({
            resources,
            success: true,
            'message': 'deleted'
        });

    } catch (error) {
        return res.json(error)
    }
}