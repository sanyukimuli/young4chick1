
function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

function ensureRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login');
    }
    if (req.user.role === 'Manager' || req.user.role === role) {
      return next();
    }
    return res.status(403).send(`Access denied: You must be a ${role}.`);
  };
}


module.exports = { ensureAuthenticated, ensureRole };
