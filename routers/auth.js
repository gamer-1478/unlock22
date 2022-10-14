const router = require('express').Router();
const passport = require('passport');
const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const { validateEmail } = require('../utilities/misc');
const { forwardAuthenticated, ensureAuthenticated } = require('../utilities/auth');

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login', { user: req.user, title: "Login" });
});

router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register', { user: req.user, title: "SignUp" });
});

router.post("/register", async (req, res, next) => {
    console.log(req.body);
    let errors = [];
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        errors.push({ msg: "Please Fill in all the fields" })
        return res.send(errors);
    }
    if (name.length < 3 || name.length > 64) {
        errors.push({ msg: "name should be in between 4 and 64 characters" })
    }
    if (password.length < 5 || password.length > 64) {
        errors.push({ msg: "Password should be in between 6 and 64 characters" })
    }
    if (!validateEmail(email)) {
        errors.push({ msg: 'The email is not a valid email.' })
    }
    await User.findOne({ email: email }).then(user => {
        if (user) {
            errors.push({ msg: "Email already exists" })
        }
    })

    if (errors.length > 0) {
        res.send(errors)
    }
    else {
        const newUser = new User({
            "name": name,
            "email": email,
            "password": password,
        })
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash;
            newUser.save().then(_ => {
                loginUser(req, res, next);
            })
        }))
    }
})

// Login
router.post('/login', (req, res, next) => {
    loginUser(req, res, next);
})

// Logout User
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

function loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send(info);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            user = JSON.parse(JSON.stringify(user));
            user.success = true;
            console.log(user);
            return res.send(user);
        }
        )
    })(req, res, next);
}

module.exports = router;