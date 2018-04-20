var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
var Tasks = require("../models/Task");
var JSAlert = require("js-alert");

var taskDetailsController = {};

//adding comments on task dashboard
taskDetailsController.addTaskComment = async (req, res) => {
    var comment = new Comments({
        comment_id: new mongoose.Types.ObjectId(),
        userName: req.body.name,
        content: req.body.content,
        timestamp: req.body.timestamp
    });

    var update = { $push: { comments: comment } };
    var conditions = { task_id: new mongoose.Types.ObjectId(req.params.id) };
    Tasks.findOneAndUpdate(conditions, update, function (err, resp) {
        if (err) return console.error(err);
        else {
            res.redirect('/task/' + req.params.id);
        }
    });
};

module.exports = taskDetailsController;