var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
var Tasks = require("../models/Task");
var JSAlert = require("js-alert");

var taskController = {};



//add task to a Sprint
taskController.addTask = async (req, res) => {
    /*
  check the assigne for a valid user, if assigne is null make isassigned false else true
  
    */
    var user = await Users.findOne({ username: req.body.assignee });
    var userName = (user != null) ? req.body.assignee : null;

    var task = new Tasks({
        task_id: new mongoose.Types.ObjectId(),
        sprint_id: new mongoose.Types.ObjectId(req.params.id),
        name: req.body.name,
        status: 'To-do',
        description: req.body.description,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        isAssigned: userName != null ? true : false,
        assignee: userName
    });
    task.save(function (err, resp) {
        if (err) {
            console.log("Task insertion failed");
            res.redirect('/sprint/' + req.params.id);
        }
        else {
            console.log("Inserted the Task successfully");
        }

    });
    res.redirect('/sprint/' + req.params.id);

    //You'll be getting the name, description, assignee, start_date, end_date
    //If assignee is null, leave it empty and make isAssigned to false

};

// list tasks of a sprint
taskController.listTasks = async (req, res) => {

//Need project, sprint and task details while render to front-end
var sprint = await Sprints.findOne({sprint_id: req.params.id});
var project = await Project.findOne({ project_id: sprint.project_id });
var lead = await Users.findOne({ username: project.lead });

//return all the sprints for the selected project
await Tasks.find({ sprint_id: req.params.id }, function (err, tasks) {
    if (err) {
        res.render('sprint', { title: 'Project page', user: req.user, project: project, lead: lead, sprint: sprint, tasks: null });
    }
    else {
        res.render('sprint', { title: 'Project page', user: req.user, project: project, lead: lead, sprint: sprint, tasks: tasks });
    }
})

};

// update a sprint
taskController.updateSprint = async (req, res) => {


    Sprints.findOne({ sprint_id: new mongoose.Types.ObjectId(req.params.id) }, function (err, doc) {
        if (err) {
            console.log("update sprint failed");
            res.redirect('/sprint/' + req.params.id);
        }
        else {
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.start_date = req.body.startDate;
            doc.end_date = req.body.endDate;
            doc.status = req.body.status;
            doc.save(function (err, resp) {
                if (err) {
                    console.log("update sprint failed");
                    res.redirect('/sprint/' + req.params.id);
                }
                else
                {
                    console.log("updated sprint successfully");
                }
            }
            );

        }
        res.redirect('/sprint/' + req.params.id);
    });

};

taskController.addSprintComment = async (req, res) => {

};

module.exports = taskController;