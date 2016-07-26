var router = require('express').Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(req, res){
  res.json(req.isAuthenticated());
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/views/success.html',
    failureRedirect: '/views/failure.html'
  })
);

module.exports = router;
