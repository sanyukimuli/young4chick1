const express = require('express');
const router = express.Router();

const Stock = require('../models/ChickStockModel');

const Request = require('../models/ChickRequestModel');

const User = require('../models/User');

const { ensureAuthenticated, ensureRole } = require('../middleware/roleCheck');

// Manager Hub page

// GET Manager Hub page
router.get('/mHub', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
  try {

    const allStock = await Stock.find();
    const requests = await Request.find().sort({ requestDate: -1});
    const users = await User.find();


    // Calculate total quantity
    const totalQuantity = allStock.reduce((sum, entry) => sum + entry.quantity, 0);

    // Get most recent stockDate (from the stockDate input in add stock form)
    const lastUpdated = allStock.length
      ? allStock.reduce((latest, entry) => (entry.stockDate > latest ? entry.stockDate : latest), allStock[0].stockDate)
      : null;

    const appointments = await Request.find({appointmentDate: { $exists: true, $ne: null, $gte: new Date() }}).sort({appointmentDate: 1});
    
/* Mongo DB query filters added:

$exists: true → field exists

$ne: null → not null

$gte: new Date() → appointment date is greater than or equal to right now (future or today) */
    

    //send all this data into view in pug 
    res.render('mHub', {
      username: req.user.firstName,
      appointments,
      stockAmount: totalQuantity,
      lastUpdated: lastUpdated ? lastUpdated.toDateString() : 'N/A',
      requests,
      users,
      servedFarmers: [],
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



router.get('/addstock', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
    res.render('chickstock');
});

//post sends stock data to database 

router.post('/addstock', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
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

//approve and decline requests

// Approve request
router.post('/approveRequest/:id', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.redirect('/mHub');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error approving request');
  }
});

// Decline request with notes
router.post('/declineRequest/:id', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
  try {
    const declineNotes = req.body.declineNotes || 'No reason provided';
    await Request.findByIdAndUpdate(req.params.id, { status: 'Declined', declineNotes });
    res.redirect('/mHub');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error declining request');
  }
});

// Mark sale as complete 

router.post('/completeSale/:id', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
  try {
    const requestId = req.params.id;

    // Find the chick request
    const chickRequest = await Request.findById(requestId);
    if (!chickRequest) {
      return res.status(404).send('Request not found');
    }

    // Get the quantity sold from the request 
    const quantitySold = Number(chickRequest.quantity);

    // Get stock document 
    const stock = await Stock.findOne(); 

    if (!stock) {
      return res.status(404).send('Stock record not found');
    }

    // Subtract the quantity sold from the stock amount
    stock.quantity = stock.quantity - quantitySold;

    // Make sure stock doesn't go negative
    if (stock.quantity < 0) {
      return res.status(400).send('Not enough stock to complete sale');
    }

    // Update request status
    chickRequest.status = 'Sale Completed';

  
    await stock.save();
    await chickRequest.save();


    res.redirect('/mHub');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//Reset the request to pending

// Reset request status to Pending
router.post('/resetRequest/:id', ensureAuthenticated, ensureRole('Manager'), async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, { status: 'Pending', declineNotes: '' });
    res.redirect('/mHub');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting request status');
  }
});



module.exports = router;