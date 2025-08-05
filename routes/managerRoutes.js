const express = require('express');
const router = express.Router();

const Stock = require('../models/ChickStockModel');

router.get('/addstock', (req, res) => {
    res.render('chickstock');
});

//post sends stock data to database 

router.post('/addstock', async (req, res) => {
    try{
        console.log(req.body);
        const newStock = new Stock(req.body);
        await newStock.save();
    } catch (error) {
        console.error(error);
        res.status(400).render('chickstock');
    }
});

module.exports = router;