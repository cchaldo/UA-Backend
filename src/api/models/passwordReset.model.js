const mongoose = require('mongoose');

/**
 * PasswordReset Schema
 * @private
 */
const passwordResetSchema = new mongoose.Schema({

  code: {
    type: String,
    required: true,
  },
  
  expiryDate: {
    type: Date,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});


const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);
module.exports = PasswordReset;
