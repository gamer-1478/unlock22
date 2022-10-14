const { ensureAuthenticated } = require('../utilities/auth');
const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {user: req.user});
})

module.exports = router;