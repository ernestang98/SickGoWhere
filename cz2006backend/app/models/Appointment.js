const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Represents an Appointment Entity Object. Every user can only make one appointment at a time.
 * @constructor
 * @param {string} userID - The id of the user booking the appointment.
 * @param {string} clinicID - The id of the clinic which is being booked by user.
 * @param {Object} details - The object containing the details of appointment (time, date, comments)
 * @property {string} _id automatically generated - The clinic's unique identification number
 * @property {string} _v automatically generated - The clinic's versionKey, internal revision of document
 */

const AppointmentSchema = new Schema({
  userID: {
    type: String,
    required: true,
    trim: true
  },
  clinicID: {
    type: String,
    required: true,
    trim: true
  },
  details: {
  	type: Object,
    required: true,
    trim: true
}
})

const Appointment = mongoose.model('appointment', AppointmentSchema)

module.exports = Appointment;
