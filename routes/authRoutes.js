const express = require('express');
const router = express.Router();

router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

//may need to move login register a routes here bc they are concerning authorization and authentication

module.exports = router;
