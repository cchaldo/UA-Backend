const httpStatus = require('http-status');
const Profile = require('../models/profile.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		const profileObj  = await new Profile(req.body);
		const profile     = await profileObj.save(profileObj);
    	res.status(httpStatus.OK);
		 
		return res.json({profile});
	}
	catch(error){
		return res.json(error);
	}
}

exports.view = async (req, res, next) => {
	try{
		const profile = await Profile.findById(req.params.id);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						profile 
    					});
	}
	catch(error){
		return res.json(error);
	}

}


exports.update = async (req, res, next) => {
	try{
      	const update = await Profile.update({_id: req.params.id}, req.body);
		const profile = await Profile.findById(req.params.id);


    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						update,
    						profile 
    					});
	}
	catch(error){
		return res.json(error);
	}

}

