const router = require('express').Router();

router.get('/', (req, res)=>{
    req.user = {name:"test"}
    res.render('landing', {user: req.user});
})

module.exports = router;