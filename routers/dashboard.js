const { ensureAuthenticated } = require('../utilities/auth');
const router = require('express').Router();
const User = require('../schemas/userSchema');

router.get('/', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user = user.toObject();
    if (user.diaperLastChanged < Date.now()+1000*60*60*24) {
        user.diaperStat = "rash";
    } else {
        user.diaperStat = "clean";
    }

    res.render('dashboard', { user: req.user });
})

router.get('/change/diaper', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user.gameDetails.diaperLastChanged = Date.now();
    user.gameDetails.points += 10;
    user.save();
    res.redirect('/dashboard');
})

router.get('/change/bottle', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user.gameDetails.bottleLastChanged = Date.now();
    user.gameDetails.points += 10;
    user.save();
    res.redirect('/dashboard');
})

router.get('/image/house', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    if (user.diaperStat < 60) {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418157485162497/bad_home.png')
    } else {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418154834366544/good_home.png')
    }
})

router.get('/image/bath', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    if (user.gameDetails.bathStat < 60) {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418158596653126/bad_bathroom.png')
    } else {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418155669033000/good_bathroom.png')
    }
})

router.get('/image/table', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    if (user.gameDetails.bathStat < 60) {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030456028896186458/bad_table.png')
    } else {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030456028229292092/good_table.png')
    }
})

router.get('/image/crib', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    if (user.gameDetails.sleepStat < 60) {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418155262197790/good_crib.png')
    } else {
        res.redirect('https://cdn.discordapp.com/attachments/983371448942989382/1030418148261888000/DALLE_2022-10-14_15.09.54_-_a_baby_sleeping_in_a_crib_digital_art.png')
    }
})



module.exports = router;