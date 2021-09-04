var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    postalCode:{
        type: Number,
        required: true
    },
    waitingTime:{
        type: Number,
        required: true
    },
    geocodingData: {
        type: Object,
        required: true,
        default: {}
    }
});

module.exports = mongoose.model('healthcareFacility',csvSchema);