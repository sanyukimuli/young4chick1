const express = require('express');
const router = express.Router();

const Request = require('../models/ChickRequestModel');
const User = require('../models/User');
const { ensureAuthenticated, ensureRole } = require('../middleware/roleCheck');



// SR Hub page
router.get('/srHub', ensureAuthenticated, ensureRole('Sales Rep', 'Manager'), async (req, res) => {
try {
    const requests = await Request.find().sort({ requestDate: -1 });
    const unscheduledRequests = requests.filter(req => !req.appointmentDate);
    const users = await User.find();



  res.render('srHub', { username: req.user.firstName,
      requests,
      users,
      unscheduledRequests,
      servedFarmers: [],
      appointments: []
   });

} catch (error) {
    console.error(error);
    res.render('srHub', {
      requests: [],
      unscheduledRequests: [],
      users: [],
      servedFarmers: [],
      appointments: []
    });
}
});

//appointments form submission

router.post('/scheduleAppointment/:id', ensureAuthenticated, ensureRole('Sales Rep', 'Manager'), async (req, res) => {
  try {
    const { appointmentDate, appointmentTime } = req.body;

    await Request.findByIdAndUpdate(req.params.id, {
      appointmentDate: new Date(appointmentDate),
      appointmentTime: appointmentTime
    });

    res.redirect('/srHub');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;