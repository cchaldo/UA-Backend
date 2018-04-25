const httpStatus = require('http-status');
const UserSkill  = require('../models/userSkill.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		
		const check_skill = await UserSkill.find()
								.where({userId:req.body.userId, skillId:req.body.skillId, status:1 });

		if (check_skill) {
			return res.json({
				success: true,
				user_skill: check_skill,
				message:'Skill already exist'
			});
		}
		const userSkillObj  = await new UserSkill(req.body);


		const user_skill     = await userSkillObj.save();
    	res.status(httpStatus.OK);
		 
		return res.json({
			success: true,
			user_skill
		});	
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const user_skill = await UserSkill.findById(req.params.id);
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						user_skill 
    					});
	}
	catch(error){
		return res.json(error);
	}

}

exports.index = async (req, res, next) => {
	try{
		const user_skill = await UserSkill.find().where({userId: req.params.userId, status: 1}).populate('skillId');
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						user_skill 
    					});
	}	
	catch(error){
		return res.json(error);
	}

}


exports.update = async (req, res, next) => {
	try{
      const user_skills = await UserSkill.update({_id: req.params.id}, req.body);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						user_skills
    					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.delete = async (req, res, next) => {
	try{
      const user_skill = await UserSkill.update({_id: req.params.id}, {status: 0});

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						message: 'deleted',
    					});
	}
	catch(error){
		return res.json(error);
	}
}