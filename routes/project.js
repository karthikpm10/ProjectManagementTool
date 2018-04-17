var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //console.log(req.params.id);
  res.render('project', { title: 'Project page' });
});

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('project', { title: 'Project page', user: req.user });
=======
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.render('project', { title: 'Project page' });
>>>>>>> Gautham
});



module.exports = router;