const mongoose = require('mongoose');

/**
 * Passphrase Schema
 * @private
 */
const passphraseSchema = new mongoose.Schema({
 
  passphrase: {
    type: String,
  },
  status:{
    type:Number,
    default:1,
  },
  createdBy: {
    type: String,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Passphrase', passphraseSchema);
