const mongoose = require('mongoose');

/**
 * Profile Schema
 * @private
 */
const profileSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,    
  },

  city:{
    type: String,
  },
  availability:[],

  noMedConditions:{
    type: Boolean,
  },

  noCriminal:{
    type: Boolean,
  },

  howToContribute: {
    type: String,
  },

  picture: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
