const httpStatus = require('http-status');
const SkillCategory = require('../models/skillCategory.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		const skillCategory  = await new SkillCategory(req.body).save();
    	res.status(httpStatus.OK);
		 
		return res.json({
			success: 1,
			skillCategory
		});
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const skillCategory = await SkillCategory.findById(req.params.id);
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skillCategory 
    					});
	}
	catch(error){
		return res.json(error);
	}

}

exports.index = async (req, res, next) => {
	try{
		const skillCategories = await SkillCategory.find().where({status: 1});
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skillCategories
    					});
	}
	catch(error){
		return res.json(error);
	}

}


exports.update = async (req, res, next) => {
	try{
      const skillCategory = await SkillCategory.update({_id: req.params.id}, req.body);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						skillCategory
    					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.delete = async (req, res, next) => {
	try{
      const skillCategory = await SkillCategory.update({_id: req.params.id}, {status:0});

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