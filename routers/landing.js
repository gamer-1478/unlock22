const router = require('express').Router();
const User = require('../schemas/userSchema');

router.get('/', (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
    res.render('landing', {user: req.user});
    }
})

router.get('/premium', (req, res)=>{
    res.render('premium', {user: req.user});
})

router.get('/leaderboard', async (req, res)=>{
    var users = await User.find({})
    res.render('leaderboard', {user: req.user, users});
})

router.get('/profile', (req, res)=>{
    res.render('profile', {user: req.user});
})

router.get('/courses', (req, res)=>{
    res.render('courses', {user: req.user});
})

module.exports = router;