const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Represents a Clinic Entity Object
 * @constructor
 * @param {string} name - The name of the clinic.
 * @param {string} longitude - The longitude of the clinic's location.
 * @param {string} latitude - The latitude of the clinic's location.
 * @param {Object} bookedTimeSlots - The object containing the details of
 * the booked time slots (keys are the userId, value are the booking details).
 * @property {string} _id automatically generated - The clinic's unique identification number
 * @property {string} _v automatically generated - The clinic's versionKey, internal revision of document
 */

const ClinicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  bookedTimeSlots: {
    type: Object,
    required: true,
    trim: true
  }
})

const Clinic = mongoose.model('clinic', ClinicSchema)

module.exports = Clinic;
