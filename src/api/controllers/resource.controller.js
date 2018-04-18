const httpStatus = require('http-status');
const Resource = require('../models/resource.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
  try{
    const resourceObj  = await new Resource(req.body);
    const resource     = await resourceObj.save();
      res.status(httpStatus.OK);
     
    return res.json({resource});
  }
  catch(error){
    return res.json(error);
  }
}


exports.view = async (req, res, next) => {
  try{
    const resource = await Resource.findById(req.params.id);
      res.status(httpStatus.OK);
      return res.json({
                success: true,
                resource
              });
  }
  catch(error){
    return res.json(error);
  }

}

exports.index = async (req, res, next) => {
  try{
    const resource = await Resource.find();
      res.status(httpStatus.OK);
      return res.json({
                success: true,
                resource
              });
  }
  catch(error){
    return res.json(error);
  }

}


exports.update = async (req, res, next) => {
  try{
      const resource = await Resource.update({_id: req.params.id}, req.body);

      res.status(httpStatus.OK);
      return res.json({
                success: true,
                resource
              });
  }
  catch(error){
    return res.json(error);
  }
}


exports.delete = async (req, res, next) => {
  try{
      const resource = await Resource.update({_id: req.params.id}, {status:0});

      res.status(httpStatus.OK);
      return res.json({
                success: true,
                'message': 'deleted'
              });
  }
  catch(error){
    return res.json(error);
  }
}