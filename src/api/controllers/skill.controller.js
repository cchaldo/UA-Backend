const httpStatus = require('http-status');
const Skill = require('../models/skill.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		const skillObj  = await new Skill(req.body);
		const skill     = await skillObj.save(skillObj);
    	res.status(httpStatus.OK);
		 
		return res.json({skill});
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const skill = await Skill.find({id: req.params.id});
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
		const skill = await Skill.find().where({status: 1});
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