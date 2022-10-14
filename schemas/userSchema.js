const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const userSchema = new mongoose.Schema({
    email: reqString,
    name: reqString,
    password: reqString,
    date: {
        type: String,
        default: dateStringWithTime
    },
    admin: reqBoolean,
    gameDetails: {
        points: { type: Number, default: 0, required: false },
        bathStat: { type: String, default: 100, required: false },
        diaperLastChanged: { type: String, default: Date.now(), required: false },
        bottleLastChanged: { type: String, default: Date.now(), required: false },
        lastTimeSlept: { type: String, default: Date.now(), required: false },
        lastTimeFed: { type: String, default: Date.now(), required: false },
        lastTimePooped: { type: String, default: Date.now(), required: false },
        lastTimeCaredFor: { type: String, default: Date.now(), required: false },
        careStat: { type: Number, default: 100, required: false },
        diaperStat: { type: String, default: 100, required: false },
        sleepStat: { type: String, default: 0, required: false },
        sleepStarted: { type: String, required: false },
        feedStat: { type: String, default: 100, required: false },
        rashStat: { type: String, default: 0, required: false },
    }
})

module.exports = mongoose.model("User", userSchema)
