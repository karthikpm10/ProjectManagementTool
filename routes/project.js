var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //console.log(req.params.id);
  res.render('project', { title: 'Project page' });
});

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('project', { title: 'Project page', user: req.user });

});



module.exports = router;