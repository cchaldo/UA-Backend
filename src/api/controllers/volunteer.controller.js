const httpStatus = require('http-status');
const User = require('../models/user.model');
const { handler: errorHandler } = require('../middlewares/error');

// send email using nodemailer
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const transporter = nodemailer.createTransport(sparkPostTransport({sparkPostApiKey:process.env.SPARKPOST_API_KEY }))

exports.create = async (req, res, next) => {
	try{
    	req.body.status = 2;
    	if (req.body.role =="undefined" || req.body.role == null || req.body.role == '' ) {
    		req.body.role == "user";
    	}
    		
		const userObj  = await new User(req.body);
		const user     = await userObj.save();

		const link  = 'http://mvp.urbanarray.org/verify/'+user.id;
	    const message = "<p>You have been invited, click on the link below to verfiy your account </p> <p>" 
	                          + "<a href="+link +" >"+ 'Click Here' +"</a> </p>"; 

	    let result  = transporter.sendMail({
	      from: ' <social1@urbanarray.org>',
	      to: user.email,
	      subject: 'Invitation',
	      text: '',
	      html: message,
	      // attachments: attachments,
	    }, function(err, info) {
	      if (err) {
	        throw err;
	      } else {
	        console.log('Success: ' + JSON.stringify(info, null, 2));
	        res.status(httpStatus.CREATED);
	        return res.json({ token, user: userTransformed });
	      }
	    });

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