const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
});

// signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// login route
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;