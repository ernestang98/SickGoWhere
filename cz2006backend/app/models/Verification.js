const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Represents an User Entity Object.
 * @constructor
 * @param {string} email - The email of the user seeking verification.
 * @param {string} code - The 6 digit code sent to user's email seeking verification.
 * @param {Date} dateCreated - The date and time 6 digit code was created, with a 10 minutes expiry time.
 * @param {enum} type - Type of verification requesting (reset password or verify account).
 * @property {string} _id automatically generated - The clinic's unique identification number
 * @property {string} _v automatically generated - The clinic's versionKey, internal revision of document
 */

const VerificationSchema = new Schema({
  email: {
        type: String,
        required: true,
  },
  code: {
      type: String,
      required: true,
  },
  dateCreated: {
      type: Date,
      default: Date.now(),
      expires: '10m',
  },
  type: {
    type: String,
    enum: ['Reset', 'Verify'],
    required: true
  }
})

const Verification = mongoose.model('verification', VerificationSchema)

module.exports = Verification;
