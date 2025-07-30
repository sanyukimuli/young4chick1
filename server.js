// 1. Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

// import routes
// const somethingRoutes = require('./routes/somethingRoutes');
const indexRoutes = require('./routes/indexRoutes');

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

// 4. Middleware
app.use((req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 5. Routes
// app.use('/', somethingRoutes);
app.use('/', indexRoutes);

// error handler
app.use((req, res) => {
  res.status(404).send('Oops! Route not found.');
});

// 6. Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
