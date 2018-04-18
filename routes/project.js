var express = require('express');
var router = express.Router();
var sprintcontroller = require("../controllers/SprintController");
var Project = require("../models/Project");
var User = require("../models/User");

/* GET home page. */

router.get('/', function(req, res, next) {
  //list sprints
  console.log(req.user);
  res.render('project', { title: 'Project page', user: req.user });

});

router.get('/:id', async(req, res, next) => {
  //list sprints
  console.log(req.params.id);
  var project = await Project.findOne({project_id : req.params.id});
  var lead = await User.findOne({username: project.lead});

  res.render('project', { title: 'Project page', user: req.user, project: project, lead: lead });
});

router.post('/', function(req, res, next) {
  //list sprints
  // console.log(req.user);
  console.log(req.body.member);
  res.render('project', { title: 'Project page', user: req.user });
});

//uncomment below
router.post('/:id/AddMember', sprintcontroller.addMember);
router.post('/:id/AddSprint', sprintcontroller.addSprint);


module.exports = router;