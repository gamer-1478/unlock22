const { ensureAuthenticated } = require('../utilities/auth');
const router = require('express').Router();
const User = require('../schemas/userSchema');

router.get('/', ensureAuthenticated, async (req, res) => {
    var user = await User.findOne({ email: req.user.email })
    user = user.toObject();

    var ques = [
        {
            ques: "Diaper rash is a common form of?",
            ans: "dermatitis", options: ["dermatitis", "skin allergy", "skin cancer", "none of the above"]
        },
        {
            ques: "When is a baby's first diaper rash most likely to occur?",
            ans: "1 to 3 weeks old", options: ["1 to 3 weeks old", "1 to 6 months old", "7 to 12 months old", "13 to 24 months old"]
        },
        {
            ques: "What is the most common cause of diaper rash?",
            ans: "Skin exposure to the pee and poo in a diaper", options: ["Skin exposure to the pee and poo in a diaper", "Wet skin", "Diarrhea", "Skin reaction to a chemical"]
        },
        {
            ques: "What's the best way to prevent diaper rash?",
            ans: "Dalle", options: ["Change your baby's diaper every one to three hours and at least once a night",
                "Carefully clean his skin and apply a barrier cream with petroleum jelly or zinc oxide after each change",
                "Let your baby have plenty of 'bare-bum' time",
                "All of the above"]
        },
        {
            ques: "Test your knowledge of barrier cream. Which answer is false?",
            ans: "You should look for a barrier cream that contains vitamin A for your newborn",
            options: [
                "Petroleum jelly and zinc oxide cream help protect your baby’s skin from soiled diapers and from the friction caused by a wet diaper",
                "You do not need to wipe off all of the barrier cream with each change only the soiled layer",
                "You should look for a barrier cream that contains vitamin A for your newborn",
                "You should not share diaper cream with other babies"
            ]
        }
    ]

    res.render('dashboard', { user: req.user, ques: ques });
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

// async function updateStatsBG() {
//     var users = await User.find();
//     users.forEach(async (user) => {
//         user.gameDetails.bathStat  = 100;
//         user.gameDetails.sleepStat = 0;
//         user.gameDetails.diaperStat = 100;
//         user.gameDetails.careStat = 100;
//         user.gameDetails.feedStat = 100;
//         user.gameDetails.rashStat = 0;
//         user.save();
//     })
// }

// setInterval(updateStatsBG, 1000);


module.exports = router;