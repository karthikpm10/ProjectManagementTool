var express = require('express');
var router = express.Router();
var taskdetails = require("../controllers/TaskDetailsController");
var Sprints = require("../models/Sprint");
var Projects = require("../models/Project");
var Tasks = require("../models/Task");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('task', { title: 'Task Page' });
// });

router.get('/:id', async (req, res, next) => {
  //list tasks
  console.log(req.params.id);
  var task = await Tasks.findOne({task_id: req.params.id});
  var sprint = await Sprints.findOne({sprint_id: task.sprint_id})
  var project = await Projects.findOne({project_id: sprint.project_id})

  if(task == null)
    res.render('index', { status: JSON.stringify(status), user: req.user});
  else
    res.render('task', { title: 'Task page', user: req.user, project: project, sprint: sprint, task: task });
  
});


//router.post('/:id/AddTaskComment', // add whichever controller you are using);
module.exports = router;
