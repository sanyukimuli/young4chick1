const express = require('express');
const router = express.Router();

const Request = require('../models/ChickRequestModel')

// YF Hub page
router.get('/yfHub', (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  if (req.user.role !== 'Farmer') {
    return res.status(403).send('Access denied: You must be a farmer to access this page.');
  }

  res.render('yfHub', { username: req.user.firstName });
});



//chick request form submission

router.post('/requestChicks', async (req,res) => {
    try{
        console.log(req.body);
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.redirect('yfHub')
    } catch(error) {
            console.error(error);
            res.status(400).render('yfHub')
        }
});

//order history 

module.exports = router;
