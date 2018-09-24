const httpStatus = require('http-status');
const Project = require('../models/project.model');
const { handler: errorHandler } = require('../middlewares/error');
const paginate = require('mongoose-paginate');
const places = require('./places.controller');


exports.create = async (req, res, next) => {
  try{
    const projectObj  = await new Project(req.body);
    const project     = await projectObj.save();
      res.status(httpStatus.OK);
     
    return res.json({project});
  }
  catch(error){
    return res.json(error);
  }
}


exports.view = async (req, res, next) => {
  
  
  try{
    const project = await Project.findById(req.params.id);
    // .populate(['place']);
      res.status(httpStatus.OK);
      return res.json({
                success: true,
                project
              });
  }
  catch(error){
    return res.json(error);
  }

}

exports.index = async (req, res, next) => {
  
  try{
    
    const {page, limit} = req.query;
    const project = await Project.paginate({ status: 1 }, 
      // { populate: ['place'] }, 
    {
      page: page,
      limit: 10
    });
    
    res.status(httpStatus.OK);
      return res.json({
        success: true,
                project
              });
  }
  catch(error){
    return res.json(error);   
  }

}


exports.update = async (req, res, next) => {
  try{
      const project = await Project.update({_id: req.params.id}, req.body);

      res.status(httpStatus.OK);
      return res.json({ 
                success: true,
                project
              });
  }
  catch(error){
    return res.json(error);
  }
}


exports.delete = async (req, res, next) => {
  try{
      const project = await Project.update({_id: req.params.id}, {status:0});

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