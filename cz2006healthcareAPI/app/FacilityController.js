const Facility = require('./Facility');

exports.getAll = async (req, res, next) => {
    try {
        const facility = await Facility.find({})

        if (!facility) res.json({ status: "error" })
        else {
            // const geocodingDataClean = JSON.parse(facility[0].geocodingData)
            // console.log(geocodingDataClean.elevation)
            res.json({ status: "success", data: facility })
        }

    } catch (error) {
        next(error)
    }
}
