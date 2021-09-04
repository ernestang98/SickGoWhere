const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Represents an User Entity Object.
 * @constructor
 * @param {string} firstName - The firstName of the user.
 * @param {string} lastName - The lastName of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user (hashed).
 * @param {string} status - The verification status of the user.
 * @param {Boolean} appointment - Whether or not user has made an appointment.
 * @property {string} _id automatically generated - The clinic's unique identification number
 * @property {string} _v automatically generated - The clinic's versionKey, internal revision of document
 */

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  // role: {
  //   type: String,
  //   default: "user",
  //   enum: ["user", "admin"]
  // },
  status: {
    type: String,
    default: "pending",
  },
  appointment: {
  	type: Boolean,
  	default: false
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User;
