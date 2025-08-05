// 1. Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

//import signup model

const SignupUser = require('./models/SignupModel')

// import routes
// const somethingRoutes = require('./routes/somethingRoutes');
const indexRoutes = require('./routes/indexRoutes');
const signupRoutes = require('./routes/signupRoutes');
// const loginRoutes = require('./routes/loginRoutes');
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const managerRoutes = require('./routes/managerRoutes');

const expressSession = require('express-session')({
  secret: 'young4chick',
  resave: false,
  saveUninitialized: false});


//instantiations 
const app = express();
const port = 3002; // default port

// 2. Database connection
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (error) => {
    console.error(`Connection error: ${error.message}`);
  });

// 3. View engine config 
app.set('view engine', 'pug'); // setting pug as the view engine
app.set('views', path.join(__dirname, 'views')); //saying our front endpages will be found here 


//express session configs 
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

//passport configs
passport.use(SignupUser.createStrategy());
passport.serializeUser(SignupUser.serializeUser());
passport.deserializeUser(SignupUser.deserializeUser());


// 4. Middleware
// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 5. Routes
// app.use('/', somethingRoutes);
app.use('/', indexRoutes);
app.use('/', signupRoutes);
// app.use('/', loginRoutes);
app.use('/', authRoutes);
app.use('/', farmerRoutes);
app.use('/', managerRoutes);

// error handler
app.use((req, res) => {
  res.status(404).send('Oops! Route not found.');
});


// 6. Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
