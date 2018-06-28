const httpStatus = require('http-status');
const Communication = require('../models/ProjectTeamMember.model');
const {handler: errorHandler} = require('../middlewares/error');

exports.create = async (req, res, next) => {
  try{
    const projectTeamMemberObj  = await new ProjectTeamMember(req.body);
    const projectTeamMember     = await projectTeamMemberObj.save();
      res.status(httpStatus.OK);

    return res.json({projectTeamMember});
  }
  catch(error){
    return res.json(error);
  }
}


exports.view = async (req, res, next) => {


  try{
    const projectTeamMember = await ProjectTeamMember.findById(req.params.id).populate(['place']);
      res.status(httpStatus.OK);
      return res.json({
                success: true,
                projectTeamMember
              });
  }
  catch(error){
    return res.json(error);
  }

}

exports.update = async (req, res, next) => {
  try{
      const projectTeamMember = await ProjectTeamMember.update({_id: req.params.id}, req.body);

      res.status(httpStatus.OK);
      return res.json({
                success: true,
                projectTeamMember
              });
  }
  catch(error){
    return res.json(error);
  }
}


exports.delete = async (req, res, next) => {
  try{
      const projectTeamMember = await ProjectTeamMember.update({_id: req.params.id}, {status:0});

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
