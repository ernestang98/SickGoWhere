const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Address: {
        type: Object,
        required: true,
        trim: true
    },
    postalCode: {
        type: Number,
        required: true,
        trim: true
    },
    waitingTime: {
        type: Number,
        required: true,
        trim: true
    },
    geocodingData: {
        type: String,
        required: true,
        trim: true
    },
})

const Facility = mongoose.model('healthcareFacility', FacilitySchema)

module.exports = Facility;
