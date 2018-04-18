var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");
var Sprints = require("../models/Sprint");
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

    var sprint = new Sprints({
        sprint_id: new mongoose.Types.ObjectId(),
        project_id: new mongoose.Types.ObjectId(req.params.id),
        name: req.body.name,
        status:'To-do',
        description: req.body.description,
        start_date: req.body.startDate,
        end_date: req.body.endDate
    });
    sprint.save(function (err, resp) {
        if (err) { 
            console.log("Sprint insertion failed");
            res.redirect('/project/'+req.params.id);
        }
        else{
            console.log("Inserted the sprint successfully");
        }
        
    });
    res.redirect('/project/'+req.params.id);
    
    };


    sprintController.listSprints = async (req, res) => {
        var project = await Project.findOne({project_id : req.params.id});
        var lead = await Users.findOne({username: project.lead});
        //return all the sprints for the selected project
        await Sprints.find({project_id :req.params.id},function(err,sprints){
            if(err){
                res.render('project', { title: 'Project page', user: req.user, project: project, lead: lead });
            }  
            else{
                res.render('project', { title: 'Project page', user: req.user, project: project, lead: lead, sprint:sprints});    
            }
            })

           

    };

module.exports = sprintController;