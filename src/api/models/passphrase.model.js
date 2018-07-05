const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
* User Roles
*/
const roles = ['user', 'admin', 'project manager', 'area manager'];
const socialSignupSources = ['facebook', 'google', 'linkedIn'];

/**
 * User Schema
 * @private
 */
const passpharaseSchema = new mongoose.Schema({
 
  passpharase: {
    type: String,
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  status:{
    type:Number,
    default:1,
  },
  facebookId: {
  
  },
  googleId: {
  
  },
  linkedInId: {
  
  },
  sources:[],
  
  role: {
    type: String,
    // enum: roles,
    default: 'user',
  },
  picture: {
    type: String,
    trim: true,
  },
  accessToken:{
    type:String,
  },
}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
passpharaseSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('passpharase')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.passpharase, rounds);
    this.passpharase = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
passpharaseSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'picture', 'role', 'status', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passpharaseMatches(passpharase) {
    return bcrypt.compare(passpharase, this.passpharase);
  },
});

/**
 * Statics
 */
passpharaseSchema.statics = {

  roles,
  socialSignupSources,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { passpharase, refreshObject } = options;
    if (passpharase) {
      if (user && await user.passpharaseMatches(passpharase)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect passpharase';
    } else {
      err.message = 'Incorrect passpharase or refreshToken';
    }
    throw new APIError(err);
  },

  

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, name, passpharase, role,
  }) {
    const options = omitBy({ name, passpharase, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicatePasspharase(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'passpharase',
          location: 'body',
          messages: ['"passpharase" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  async oAuthLogin({
    service, id, passpharase, name, picture,
  }) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { passpharase }] });
    if (user) {
      user.services[service] = id;
      if (!user.name) user.name = name;
      if (!user.picture) user.picture = picture;
      return user.save();
    }
    const passpharase = uuidv4();
    return this.create({
      services: { [service]: id }, passpharase, name, picture,
    });
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', passpharaseSchema);
