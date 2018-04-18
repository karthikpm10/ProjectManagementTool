var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");

var sprintController = {};


// Insert a Project into Database
sprintController.addMember = async (req, res) => {

    console.log(req.params.id);

    //Redirect back to this. Do not change the below line.
    res.redirect('/project/'+req.params.id);

};

sprintController.addSprint = async (req, res) => {
    
    console.log(req.params.id);


    //Redirect back to this. Do not change the below line.
    res.redirect('/project/'+req.params.id);
    
    };


module.exports = sprintController;