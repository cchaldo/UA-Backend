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

  availability_start_date:{
    type:String,
  },

  availability_end_date:{
    type:String,
  },

  noMedConditions:{
    type: Number,
  },

  noCriminal:{
    type: Number,
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
