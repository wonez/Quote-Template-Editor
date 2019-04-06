const express = require('express')
// const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const isAuthenticated = require('./isAuthenticated');

require('./passport-config')

const app = express()
const port = process.env.PORT || 3000;

require('./db')();

// app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json( {limit: '50mb'} ))

app.use(express.static('public'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

//session
app.use(session({ secret: 'quote', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//routes
app.use('/app', isAuthenticated, require('./routes/appRoutes.js'));
app.use('', require('./routes/userRoutes.js'));

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})