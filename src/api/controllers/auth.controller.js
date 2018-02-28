const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const qs = require('qs');
const request = require('superagent');
const nodemailer = require('nodemailer');

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
    const user = await (new User(req.body)).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
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
    let userObj = await User.findOne().where({email:req.body.email});

    if (userObj == null) {
      user          = new User;
      user.email    = req.body.email;
      user.name     = req.body.name;
      user.picture  = req.body.picture;
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
  
    return res.json({ token, user: currentUser });

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
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();



    return res.json({ token, user: userTransformed });
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
