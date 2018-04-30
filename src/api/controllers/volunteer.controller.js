const httpStatus = require('http-status');
const User = require('../models/user.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.create = async (req, res, next) => {
	try{
    	req.body.status = 2;
		const userObj  = await new User(req.body);
		const user     = await userObj.save();
    	res.status(httpStatus.OK);
		 
		return res.json({user});
	}
	catch(error){
		return res.json(error);
	}
}


exports.view = async (req, res, next) => {
	try{
		const user = await User.findById(req.params.id);
    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						user 
    					});
	}
	catch(error){
		return res.json(error);
	}

}

exports.index = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
   	
	res.status(httpStatus.OK);
	return res.json({
						success: true,
						user: transformedUsers
					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.update = async (req, res, next) => {
	try{
      const user = await User.update({_id: req.params.id}, req.body);

    	res.status(httpStatus.OK);
    	return res.json({
    						success: true,
    						user
    					});
	}
	catch(error){
		return res.json(error);
	}
}


exports.delete = async (req, res, next) => {
	try{
      const user = await User.update({_id: req.params.id}, {status:0});

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