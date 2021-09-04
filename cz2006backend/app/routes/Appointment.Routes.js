const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

router.post('/createAppointment', appointmentController.createAppointment);

router.get('/readAppointment/:userId', appointmentController.readAppointment);

router.put('/updateAppointment', appointmentController.updateAppointment);

router.delete('/deleteAppointment', appointmentController.deleteAppointment);

router.post('/readTimeSlots', appointmentController.readTimeSlots);

module.exports = router;
