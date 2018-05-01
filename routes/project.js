var express = require('express');
var router = express.Router();
var sprintcontroller = require("../controllers/SprintController");
//var Project = require("../models/Project");
//var User = require("../models/User");

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('project', { title: 'Project page', user: req.user });

});*/

router.get('/:id', async (req, res, next) => {
  
  if(!req.user){
    res.redirect('/');
  }

  //list sprints
  console.log(req.params.id);
  await sprintcontroller.listSprints(req, res);
});

//uncomment below
router.post('/:id/AddMember', sprintcontroller.addMember);
router.post('/:id/AddSprint', sprintcontroller.addSprint);
router.post('/:id/UpdateProject', sprintcontroller.updateProject);
router.post('/:id/AddProjectComment', sprintcontroller.addProjectComment);


module.exports = router;