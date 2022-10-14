const { ensureAuthenticated } = require('../utilities/auth');
const router = require('express').Router();
const User = require('../schemas/userSchema');

router.get('/', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user = user.toObject();
    res.render('dashboard', { user: req.user });
})

router.get('/change/diaper', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user.gameDetails.diaperLastChanged = Date.now();
    user.gameDetails.points += 10;
    user.gameDetails.diaperStat = 100;
    user.gameDetails.rashStat = 0;
    user.save();
    res.send({ msg: 'Diaper changed!' });
})

router.get('/change/bottle', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user.gameDetails.bottleLastChanged = Date.now();
    user.gameDetails.points += 10;
    user.gameDetails.feedStat = 100;
    user.save();
    res.send({ msg: 'Bottle changed!' });
})

router.get('/image/house', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    if (user.gameDetails.diaperStat < 60) {
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


async function updateStatsBG() {
    var users = await User.find();
    users.forEach(async (user) => {
        user.gameDetails.bathStat -= 1;
        user.gameDetails.sleepStat += 2;
        user.gameDetails.diaperStat -= 2;
        user.gameDetails.careStat -= 1;
        user.gameDetails.feedStat -= 1;
        user.gameDetails.rashStat += 1;
        user.save();
    })
}

setInterval(updateStatsBG, 120000);


module.exports = router;