var router = require('express').Router();
var passport = require('passport');
var path = require('path');
var User = require('../public/models/user.js');


router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', function(req,res,next) {
  User.create(req.body, function (err, post) {
    if (err) {
      next(err);
    } else {
      // we registered the user, but they haven't logged in yet.
      // redirect them to the login page
      console.log('post route in register.js');
      res.redirect('/');
    }
  })
});


module.exports = router;
