var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");

var projectController = {};


// Insert a Project into Database
//    var data = await Session.findOne({ username: req.body.username, session_id: new ObjectId(req.body.session_id) });
projectController.insert = async (request, response)=>{

 
    
   var membersList = request.body.member.split(",");
   var validmemberList = [];

for(var i=0;i<membersList.length;i++)
{
    var user = await Users.findOne({username:membersList[i]}); 
      if( user != null)
      {
        validmemberList.push(membersList[i]);
      }
}

    var projectObj = new Project({
        project_id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        description: request.body.description,
        lead: request.user.username,
        members: validmemberList,
        start_date: request.body.start_date,
        end_date: request.body.end_date
    });
    projectObj.save(function (err, resp) {
        if (err) return console.error(err);
        else {
            //insert the projectid into user table 
            var conditions = {username:request.user.username};
            var update = {$push:{project_id:projectObj.project_id}};
            Users.findOneAndUpdate(conditions,update,function(err,resp)
            {
                if(err) return console.error(err);

            });

            
            validmemberList.forEach(element => {
               conditions = {username:element};
               Users.findOneAndUpdate(conditions,update,function(err,resp)
            {
                if(err) return console.error(err);

            });
            });
            
        }

    }



);


    /*
     create a Project Model object by using the parameters in the request object
     call save on the Project Model object

    */

};



module.exports = projectController;