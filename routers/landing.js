const router = require('express').Router();

router.get('/', (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
    res.render('landing', {user: req.user});
    }
})

module.exports = router;