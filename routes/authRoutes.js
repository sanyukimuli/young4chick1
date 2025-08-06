const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async(req, res) => {
  try {
    const user = new User(req.body);
    let existingUser = await User.findOne({email:req.body.email}) //checking if the email registered in the database is same 
    if(existingUser){
      return res.status(400).send('That email already exists.');
    } else {
      await User.register(user, req.body.password, (err) => {
        if(err){
          throw err
        }
        res.redirect('/login')
      })
    }
  } catch (error) {
    res.status(400).send('Sorry, something went wrong - you were unable to signup')
  }
});

// login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/login'}), (req, res) => {
  req.session.user = req.user;

  if(req.user.role == 'Farmer'){
    res.redirect('/yfHub')
  } else if(req.user.role == 'Sales Rep'){
    res.redirect('/srHub') 
  } else if (req.user.role == 'Manager'){
    res.redirect('/mHub')
  } else {
    res.send('You do not have a role in the system')
  }

    
});

//logout 
router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy((error) =>{
      if(error){
        return res.status(500).send('Error logging out')
      }
      res.redirect('/')
    })
  }
});



router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

//move login register a routes here bc they are concerning authorization and authentication

// we are going to use session based authentication 



module.exports = router;
