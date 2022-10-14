function forwardAuthenticated(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/profile');
}

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = {
    forwardAuthenticated,
    ensureAuthenticated
}