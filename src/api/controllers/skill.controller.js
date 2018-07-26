const httpStatus = require('http-status');
const Skill = require('../models/skill.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		const skillObj  = await new Skill(req.body);
		const skill     = await skillObj.save();
    	res.status(httpStatus.OK);
		 
		return res.json({skill});
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const skill = await Skill.findById(req.params.id).populate('categoryId');
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skill 
    					});
	}
	catch(error){
		return res.json(error);
	}

}

exports.index = async (req, res, next) => {
	try{
		const skill = await Skill.find().where({status: 1}).populate('categoryId');
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skill 
    					});
	}
	catch(error){
		return res.json(error);
	}

}


exports.update = async (req, res, next) => {
	try{
      const skill = await Skill.update({_id: req.params.id}, req.body);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skill
    					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.delete = async (req, res, next) => {
	try{
      const skill = await Skill.update({_id: req.params.id}, {status:0});

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