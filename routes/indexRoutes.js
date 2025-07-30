const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
});

/* include the routes for the signup seeing as that falls under all the users*/

module.exports = router;