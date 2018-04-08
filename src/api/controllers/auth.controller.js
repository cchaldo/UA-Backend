const httpStatus = require('http-status');

const User = require('../models/user.model');

const Profile = require('../models/profile.model');
const PasswordReset = require('../models/passwordReset.model');

const RefreshToken = require('../models/refreshToken.model');

const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');

const qs = require('qs');
const request = require('superagent');

// send email using nodemailer
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const transporter = nodemailer.createTransport(sparkPostTransport({sparkPostApiKey:process.env.SPARKPOST_API_KEY }))

const fs = require('fs');
const path = require('path');
// const moment = require('moment');




/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    req.body.status = 2;

    const user  = await (new User(req.body)).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    const link  = 'http://mvp.urbanarray.org/verify/'+user.id;

    const message = "<p>Click on the link below to verfiy your account </p> <p>" 
                          + "<a href="+link +" >"+ 'Click Here' +"</a> </p>"; 

    let result  = transporter.sendMail({
      from: ' <social1@urbanarray.org>',
      // to: 'nizaralihunzai@gmail.com',
      to: req.body.email,
      subject: 'Signup',
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

    // return res.json(1);

  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};
/**
 * Social Signup
 * @public
 */
exports.socialSignup = async (req, res, next) => {
  try {
    // return res.json(req.body);
    req.body.status = 1;
    let userObj = await User.findOne().where({email:req.body.email});

    if (userObj == null) {
      user          = new User;
      user.email    = req.body.email;
      user.name     = req.body.name;
      user.picture  = req.body.picture;
      user.status   = req.body.status;
      user.sources.push(req.body.source);
      user.acccessToken = req.body.accessToken;
      if (req.body.source == 'facebook') {
        user.facebookId = req.body.userId;
      }
      else if(req.body.source == 'google'){
        user.googleId = req.body.userId;
      }
      else if(req.body.source == 'linkedIn'){
        user.linkedInId = req.body.userId;
      }

      await user.save();
    
    }

    else if (userObj && userObj.email === req.body.email) {
      // assigning userId according to the social media source
      if (req.body.source == 'facebook') {
        if (userObj.facebookId == null || userObj.facebookId=="") {
          userObj.facebookId = req.body.userId;
          userObj.sources.push(req.body.source);
        }
        userObj.facebookId = req.body.userId;
      } 

      else if (req.body.source == 'google') {
        if (userObj.googleId == null || userObj.googleId=="") {
          userObj.googleId = req.body.userId;
          userObj.sources.push(req.body.source);
        }
        userObj.googleId = req.body.userId;
      }
      
      else if(req.body.source == 'linkedIn'){
        if (userObj.linkedInId == null || userObj.linkedInId=="") {
          userObj.linkedInId = req.body.userId;
          userObj.sources.push(req.body.source);
        }
        userObj.linkedInId = req.body.userId;
      }

      userObj.accessToken = req.body.accessToken;

      await userObj.save();

    }  

    const currentUser = await User.findOne({ email:req.body.email }).exec();
    const accessToken = await currentUser.token();
    const token = generateTokenResponse(currentUser, accessToken);
    const userTransformed = currentUser.transform();
    const profile = await(Profile.findOne({userId: userTransformed.id}));
    console.log(profile)
    return res.json({ token, user: userTransformed, profile: profile });

  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

exports.linkedinSignup = async (req,res, next) => {
  try{
    const redirect_uri = req.body.redirect_uri;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const code = req.body.code;
    // return res.json({clientId, client_secret, redirect_uri});
    
    /* Data to be sent as body to linkedin */
    const data = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirect_uri,
      'client_id': clientId,
      'client_secret': clientSecret
    };


    /* Superagent request to get access token */
    const result = await (request
        .post('https://www.linkedin.com/oauth/v2/accessToken')
        .send(qs.stringify(data))
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('application/json')

        );

      const obj = JSON.parse(result.text);

    // return res.json(obj);   

    const dataFormat = await(request
      .get('https://api.linkedin.com/v1/people/~:(id,first-name,email-address,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)')
      // .send(qs.stringify(data))
      .query({
        'oauth2_access_token': obj.access_token,
        'format': 'json'
      })
    );
    
    const access_token = obj.access_token;
    const linkedinData = JSON.parse(dataFormat.text);

    return res.json({linkedinData, access_token});   

  }
  catch(error){
    console.log(error);
  }
}


/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    if (user.status == 2) {
      throw Error('Your account is not verified');
    }
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    const profile = await(Profile.findOne({userId: user.id}));

    return res.json({ token, user: userTransformed, profile: profile });
  } catch (error) {
    return next(error);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const { user } = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};


// Verify User account
exports.verify = async (req, res, next) => {
  try{
    const currentUser = await User.findById(req.params.id);
    currentUser.status = 1;
    const user = await currentUser.save();
    const userTransformed = user.transform();
    return res.json({user: userTransformed});
  }
  catch(error){
    return res.json(error);
  }
}


// Reset Password
exports.resetPassword = async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.json({
        error: "You have entered an incorrect email address"
      });
    }

    let code = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    
    const date = moment().utc().format('YYYY-MM-DD');
    const expiryDate = moment(date, "YYYY-MM-DD").add(2, 'days');

    const resetpassword = await new PasswordReset;
    resetpassword.code = code;
    resetpassword.userId = user.id;
    resetpassword.expiryDate = expiryDate;
    await resetpassword.save();

    const link  = 'http://mvp.urbanarray.org/resetpassword/'+code;

    const message = "<p>Click on the link below to reset your password </p> <p>" 
                          + "<a href="+link +" >"+ 'Click Here' +"</a> </p>"; 

    let result  = transporter.sendMail({
      from: '<social1@urbanarray.org>',
      to: user.email,
      subject: 'Reset Password',
      text: '',
      html: message,
      // attachments: attachments,
    }, function(err, info) {
      if (err) {
        throw err;
      } else {
        console.log('Success: ' + JSON.stringify(info, null, 2));
        res.status(httpStatus.CREATED);
        return res.json(true);
      }
    });
    
  }
  catch(error){
    return res.json(error);
  }

}


exports.setNewPassword = async (req, res) => {
  try{
    const resetpassword = await PasswordReset.findOne({code: req.body.code});

    if (resetpassword && resetpassword !== null) {
      const date = moment().utc().format('YYYY-MM-DD');
      const expiryDate = moment(resetpassword.expiryDate).format('YYYY-MM-DD');
      if (expiryDate >= date) {
        const targetUser = await User.findOne(resetpassword.userId);
        targetUser.password = req.body.password;
        const user = await targetUser.save();

        return res.json(true);

      }
      else{
        return res.json({'error':'Your token has been expired'});
      }
    }
    else{
      return res.json({'error':'Your token has been expired'});
    }

  }
  catch(error){
    return res.json(error);
  }
}
