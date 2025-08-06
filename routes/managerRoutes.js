const express = require('express');
const router = express.Router();

const Stock = require('../models/ChickStockModel');

const Request = require('../models/ChickRequestModel');

const User = require('../models/User');

// Manager Hub page

// GET Manager Hub page
router.get('/mHub', async (req, res) => {
  try {
    const allStock = await Stock.find();

    // Calculate total quantity
    const totalQuantity = allStock.reduce((sum, entry) => sum + entry.quantity, 0);

    // Get most recent stockDate (from the stockDate input in add stock form)
    const lastUpdated = allStock.length
      ? allStock.reduce((latest, entry) => (entry.stockDate > latest ? entry.stockDate : latest), allStock[0].stockDate)
      : null;

      // get pending chick requests
    const pendingRequests = await Request.find({ status: 'Pending'}).sort({requestDate: -1});
    
    //get all users and sort them in most recent at top 
    const users = await User.find().sort({$natural: -1});

    //send all this data into view in pug 
    res.render('mHub', {
      stockAmount: totalQuantity,
      lastUpdated: lastUpdated ? lastUpdated.toDateString() : 'N/A',
      requests: pendingRequests,
      users: users,
      servedFarmers: [],
      appointments: []
    });
  } catch (error) {
    console.error(error);
    res.render('mHub', {
      stockAmount: 0,
      lastUpdated: 'N/A',
      requests: [],
      users: [],
      servedFarmers: [],
      appointments: []
    });
  }
});



router.get('/addstock', (req, res) => {
    res.render('chickstock');
});

//post sends stock data to database 

router.post('/addstock', async (req, res) => {
    try{
        console.log(req.body);
        const newStock = new Stock(req.body);
        await newStock.save();

        res.redirect('/mHub');
    } catch (error) {
        console.error(error);
        res.status(400).render('chickstock');
    }
});




module.exports = router;