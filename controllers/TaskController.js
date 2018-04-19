var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
var Tasks = require("../models/Task");
var JSAlert = require("js-alert");

var taskController = {};



//add task to a Sprint
taskController.addTask = async (req, res) => {

    //You'll be getting the name, description, assignee, start_date, end_date
    //If assignee is null, leave it empty and make isAssigned to false

};

// list tasks of a sprint
taskController.listTasks = async (req, res) => {

//Need project, sprint and task details while render to front-end

};

// update a sprint
taskController.updateSprint = async (req, res) => {

};

taskController.addSprintComment = async (req, res) => {
    
};

module.exports = taskController;