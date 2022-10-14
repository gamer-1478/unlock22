const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const appointmentSchema = new mongoose.Schema({
    user: reqString,
    doctorId: reqString,
    comments: reqString,
    previousMedicalIssues: reqString,
    dateforAppointment: reqString
})

module.exports = mongoose.model("Appointments", appointmentSchema)
