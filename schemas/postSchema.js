const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const postSchema = new mongoose.Schema({
    author: reqString,
    title: reqString,
    type: reqString,
    content: reqString,
    comments: [{author:reqString, content:reqString}],
    date: {
        type: String,
        default: dateStringWithTime
    },
    likes: [reqString]
})

module.exports = mongoose.model("Community", postSchema)
