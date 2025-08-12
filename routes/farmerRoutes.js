const express = require('express');
const router = express.Router();

const Request = require('../models/ChickRequestModel');

const { ensureAuthenticated, ensureRole } = require('../middleware/roleCheck');

// YF Hub page
router.get('/yfHub', ensureAuthenticated, ensureRole('Farmer', 'Manager'), async (req, res) => {

  res.render('yfHub', { username: req.user.firstName });
});



//chick request form submission

router.post('/requestChicks', ensureAuthenticated, ensureRole('Farmer', 'Manager'), async (req,res) => {
    try{
        console.log(req.body);
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.redirect('/yfHub')
    } catch(error) {
            console.error(error);
            res.status(400).render('yfHub')
        }
});

//order history 

module.exports = router;
