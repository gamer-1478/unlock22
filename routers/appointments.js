const { ensureAuthenticated } = require('../utilities/auth');
const Appointment = require('../schemas/appointmentSchema');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('appointment', { user: req.user });
})

router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('newAppointment', { user: req.user });
})

router.post('/new', ensureAuthenticated, async (req, res) => {
    const { comments, previousMedicalIssues, dateforAppointment } = req.body;
    const doctorId = uuidv4(),
        user = req.user._id;
    const appointment = await Appointment.create({
        user,
        doctorId,
        comments,
        previousMedicalIssues,
        dateforAppointment
    }).catch(err => console.log(err));
    res.send({ msg: 'Appointment created!', appointment });
})

module.exports = router;