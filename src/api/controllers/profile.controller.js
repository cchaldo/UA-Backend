const httpStatus = require('http-status');
const Profile = require('../models/profile.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
		profile = await new Profile(req.body);
		return res.json({profile});
	}
	catch(error){
		return res.json(error);
	}
}