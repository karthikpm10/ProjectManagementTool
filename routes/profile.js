var express = require('express');
var router = express.Router();
var project = require("../controllers/Project");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('profile', { title: 'Profile Page', user: req.user });
});



router.post('/InsertProject', project.insert);
module.exports = router;
