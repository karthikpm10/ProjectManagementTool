var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('task', { title: 'Task Page' });
});


//router.post('/:id/AddTaskComment', // add whichever controller you are using);
module.exports = router;
