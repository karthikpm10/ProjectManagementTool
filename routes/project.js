var express = require('express');
var router = express.Router();
var sprintcontroller = require("../controllers/SprintController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   //list sprints
//   console.log(req.user);
//   res.render('project', { title: 'Project page', user: req.user });
// });

router.get('/:id', function(req, res, next) {
  //list sprints
  console.log(req.params.id);
  res.render('project', { title: 'Project page', user: req.user });
});

//uncomment below
//router.post('/AddMember/:id', sprintcontroller.addMember);
//router.post('/AddSprint/:id', sprintcontroller.addSprint);


module.exports = router;