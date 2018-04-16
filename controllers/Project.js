var mongoose = require("mongoose");
var Project = require("../models/Project");

var projectController = {};


// Insert a Project into Database
projectController.insert = function (request, response) {
    var projectObj = new Project();
    projectObj.name = request.body.name;
    projectObj.description = request.body.description;
    projectObj.lead=request.body.lead;
    projectObj.members=request.body.members.split(",");
    projectObj.start_date=request.body.start_date;
    projectObj.end_date=request.body.end_date;
    projectObj.sprints=request.body.sprints;
    projectObj.comments=request.body.comments;
    projectObj.save(function (err, resp) {
        if (err) return console.error(err);
        
      });

   
    /*
     create a Project Model object by using the parameters in the request object
     call save on the Project Model object

    */

};



module.exports = projectController;