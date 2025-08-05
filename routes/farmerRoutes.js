const express = require('express');
const router = express.Router();

const Request = require('../models/ChickRequestModel')

// YF Hub page
router.get('/yfHub', (req, res) => {
  res.render('yfHub');  
});

//chick request form submission

router.post('/requestChicks', async (req,res) => {
    try{
        console.log(req.body);
        const newRequest = new Request(req.body);
        await newRequest.save();
    } catch(error) {
            console.error(error);
            res.status(400).render('yfHub')
        }
});

//order history 

module.exports = router;
