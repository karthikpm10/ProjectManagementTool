var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var JSAlert = require("js-alert");

var sprintController = {};


// Insert a Project into Database
sprintController.addMember = async (req, res) => {
    var user = await Users.findOne({username:req.body.member}); 
    //checking to see if the new member is already part of the selected project
    var inValidMember = user!=null?user.project_id.some(ids => ids.equals(new mongoose.Types.ObjectId(req.params.id))):true;
    if(!inValidMember)
    {
                   
                   var update = {$push:{project_id:new mongoose.Types.ObjectId(req.params.id)}};
                   var conditions = {username:req.body.member};
                   //updating user with the new projectid
                   Users.findOneAndUpdate(conditions,update,function(err,resp)
                {
                    if(err) return console.error(err);
                    else{
                        //updating project with the new member
                        update = {$push:{members:req.body.member}};
                        conditions = {project_id:new mongoose.Types.ObjectId(req.params.id)};
                        Project.findOneAndUpdate(conditions,update,function(err,resp)
                        {
                            if(err) return console.error(err);
                            else{
                                res.redirect('/project/'+req.params.id);
                            }
                        });
                    }
                });
                
        
    }
    else{
        res.redirect('/project/'+req.params.id);
          //figure out how to send error and get redericted back to this page
         // res.send('<script>alert("This Member already exists for the Project")</script>')
         // res.redirect('/project/'+req.params.id);
        console.error("This Member already exists for the Project");
    }
};

sprintController.addSprint = async (req, res) => {
    
    console.log(req.params.id);


    //Redirect back to this. Do not change the below line.
    res.redirect('/project/'+req.params.id);
    
    };


module.exports = sprintController;