require('dotenv').config()

const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require("cookie-session"),
    cookieParser = require("cookie-parser"),
    expressLayouts = require('express-ejs-layouts'),
    passport = require('passport');

const port = process.env.PORT || 3200,
    { ReportWebVital, ReportCrash } = require('./utilities/misc'),
    passport_init = require('./utilities/passport'),
    bloatRouter = require('./routers/bloat'),
    authRouter = require('./routers/auth'),
    appointmentRouter = require('./routers/appointments'),
    dashboardRouter = require('./routers/dashboard'),
    communityRouter = require('./routers/community'),
    landingRouter = require("./routers/landing");


if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
}
else {
    app.disable('trust proxy');
}

//ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));


//mongo
const db = process.env.MONGO_URI;

//passportJs
if (process.env.NODE_ENV === 'production') {
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        sameSite: 'none',
        overwrite: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }));
} else {
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    }));
}

app.use(cookieParser(process.env.SECRET));

passport_init(passport);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bloatRouter);
app.use("/", landingRouter)
app.use('/', authRouter);
app.use('/dashboard', dashboardRouter)
app.use('/community', communityRouter)
app.use('/appointment', appointmentRouter)
// app.use('/ans', answerRouter)
// app.use('/practise-back', practiseRouter)
// app.use('/event-back', event_router)
// app.use('/discord-back', discord_router)
// app.use('/email-back', email_router)

app.use((err, req, res, next) => {
    ReportCrash(err.stack.toString())
    next(err)
})

// app.get('*', (req, res) => {
//     console.log(req.url)
//     res.redirect(process.env.FRONT_END_URL + req.url);
// });

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(( mongo) => {
    ReportWebVital(`Connected to Mongo DB `+ mongo.connection.host);
    console.log("Connected to Mongo DB")
    app.listen(port, () => {
        ReportWebVital(`Unlock listening at port ${port}`);
        console.log(`Unlokc listening at http://localhost:${port}`)
    })
}).catch(err => {
    ReportCrash(err.stack.toString())
})
