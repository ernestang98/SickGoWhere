const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const clinicName = req.body.clinicName
    const clinicLong = req.body.clinicLong
    const clinicLat = req.body.clinicLat
    const date = req.body.date
    const time = req.body.time
    const others = req.body.others

    const user = await User.findOne({ _id : userId})

    if (!user) {
      res.json({
        status: "Failure",
        data: {
          message: "No user found!"
        },
      })
    }

    else {
    	if (user.appointment) {
	      res.json({
	        status: "failure",
	        data: {
	          message: "You already booked an appointment!"
	        },
	      });
	    }
	    else {
	      let bookedTimeSlots = {};

	      var clinic = await Clinic.findOne({ name : clinicName})

	      if (!clinic) {
	        let newClinic = new Clinic({
	          name: clinicName,
              longitude: clinicLong,
              latitude: clinicLat,
	          bookedTimeSlots: {},
	          freeTimeSlots: {}
	        })
	        await newClinic.save()
	        clinic = await Clinic.findOne({ name : clinicName})
	      } else {
	      	bookedTimeSlots = clinic.bookedTimeSlots
	      }
	      bookedTimeSlots[userId] = {
	        aDate: date,
	        aTime: time,
	        aOthers: others
	      }
	      await Clinic.findOneAndUpdate({ name : clinicName}, {
	        bookedTimeSlots: bookedTimeSlots
	      })
	      const newAppointment = new Appointment({
	        userID: userId,
	        clinicID: clinic._id,
	        details: {
	          date, time, others
	        }
	      })

	      await newAppointment.save()

	      await User.findOneAndUpdate({ _id : userId }, {
	        appointment: true
	      })

	      res.json({
	        status: "success",
	        data: {
	          message: "Appointment Booked!"
	        },
	      });
	    }
    }
  } catch (error) {
    next(error)
  }
}

exports.readAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({userID: req.params.userId})
    if (appointment) {

      const clinic = await Clinic.findById({ _id: appointment.clinicID })

      appointment.details.clinicName = clinic.name

      res.json({
        data: appointment.details,
        longitude: clinic.longitude,
        latitude: clinic.latitude
      })
    }
    else {
      res.json({
        message: "error"
      })
    }

  } catch (error) {
    next(error)
  }
}

exports.readTimeSlots = async (req, res, next) => {
  try {
    const clinicName = req.body.clinicName
    const clinic = await Clinic.findOne({name: clinicName})
    if (!clinic || JSON.stringify(clinic.bookedTimeSlots) === "{}" || clinic.bookedTimeSlots === null ||
        clinic.bookedTimeSlots === {} ) {
        res.json({
            status: "empty"
        })
    }
    else {
       res.json({
           status: "notEmpty",
           data: {
               bookedTimeSlots: clinic.bookedTimeSlots
           }
       })
    }

  } catch (error) {
    next(error)
  }
}

exports.updateAppointment = async (req, res, next) => {
  try {
      const userId = req.body.userId
      const date = req.body.date
      const time = req.body.time
      const others = req.body.others

      const appointment = await Appointment.findOne({userID: userId})

      if (appointment) {
          await Appointment.findOneAndUpdate({userID: userId}, {
              details: {
                  date, time, others
              }
          })

          const clinic = await Clinic.findById({ _id: appointment.clinicID })

          const updatedTimeSlots = clinic.bookedTimeSlots

          updatedTimeSlots[appointment.userID] = {
              aDate: date,
              aTime: time,
              aOthers: others
          }

          await Clinic.findOneAndUpdate({ _id: appointment.clinicID }, {
              bookedTimeSlots: updatedTimeSlots
          })

          res.json({
              message: "Success!"
          })

      }
      else {
          res.json({
              message: "failure"
          })
      }


  } catch (error) {
    next(error)
  }
}

exports.deleteAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findOne({userID: req.body.userId})
    if (appointment) {
      appointment = await Appointment.findOne({userID: req.body.userId})
      await Appointment.deleteOne({userID: req.body.userId})
      await User.findOneAndUpdate({ _id: appointment.userID }, { appointment: false })
      const clinic = await Clinic.findOne({ _id: appointment.clinicID })
      const timeSlots = clinic.bookedTimeSlots
      delete timeSlots[appointment.userID]
      await Clinic.findOneAndUpdate({ _id: appointment.clinicID }, { bookedTimeSlots: timeSlots })
      res.json({
        message: "success"
      })
    }
    else {
      res.json({
        message: "failure"
      })
    }

  } catch (error) {
    next(error)
  }
}
