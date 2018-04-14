var express = require('express');
var router = express.Router();
var auth = require("../controllers/Authentication");
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");


router.get('/', function(req, res, next) {

  var status = req.query.status;
  console.log(status)
  
  res.render('index', { title: 'Project Management Tool' });
});

router.post('/login', auth.login);

router.post('/register', auth.register);

router.get('/logout', auth.logout);

module.exports = router;
