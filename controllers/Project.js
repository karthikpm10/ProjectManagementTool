
var mongoose = require("mongoose");
var Project = require("../models/Project");
var Users = require("../models/User");

var projectController = {};


// Insert a Project into Database
projectController.insert = async (request, response)=>{

   var membersList = request.body.member.split(",");
   let validmemberList = new Set();

for(var i=0;i<membersList.length;i++)
{
    var user = await Users.findOne({username:membersList[i]}); 
      if( user != null)
      {
        validmemberList.add(membersList[i]);
      }
}
 
validmemberList.has(request.user.username) ? true :validmemberList.add(request.user.username);

    var projectObj = new Project({
        project_id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        description: request.body.description,
        lead: request.user.username,
        members: Array.from(validmemberList),
        start_date: request.body.start_date,
        end_date: request.body.end_date
    });
    projectObj.save(function (err, resp) {
        if (err) return console.error(err);
        else {
           
            var conditions ;
             var update = {$push:{project_id:projectObj.project_id}};
            //insert the projectid into all the group members
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
};



module.exports = projectController;