const httpStatus = require('http-status');
const Role = require('../models/role.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		const roleObj  = await new Role(req.body);
		const role     = await roleObj.save();
    	res.status(httpStatus.OK);
		 
		return res.json({role});
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const role = await Role.findById(req.params.id);
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						role 
    					});
	}
	catch(error){
		return res.json(error);
	}

}


exports.index = async (req, res, next) => {
	try{
		const role = await Role.find().where({status: 1});
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						role
    					});
	}
	catch(error){
		return res.json(error);
	}

}


exports.update = async (req, res, next) => {
	try{
      const role = await Role.update({_id: req.params.id}, req.body);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						role
    					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.delete = async (req, res, next) => {
	try{
      const role = await Role.update({_id: req.params.id}, {status:0});

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