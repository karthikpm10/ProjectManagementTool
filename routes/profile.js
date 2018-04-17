var express = require('express');
var router = express.Router();
var projectcontroller = require("../controllers/Project");
var Project = require("../models/Project");
var Users = require("../models/User");
var mongoose = require("mongoose");

/* GET home page. */
router.get('/', async(req, res) => {
  console.log(req.user);

  //var user = await Users.findOne({username:req.user.username}); 
  if( req.user != null)
  {
    var projectlist =  req.user.project_id;
    var newProjectList = [];
    for(var i=0;i<projectlist.length;i++){
        newProjectList.push(new mongoose.Types.ObjectId(projectlist[i]));
    } 
    var condition = {$in:newProjectList};
    await Project.find({'project_id' :  condition},function(err,docs){
      if(err){
        res.render('index', { title: 'Index Page'});
      }
      console.log(docs);
      res.render('profile',  { title: 'Profile Page', user: req.user, projects: docs });
        
      })
    

    

  }
else{
 
}



  // var x = await project.getprojects(req);
  // var e = 2+3;
  
});


router.post('/InsertProject', projectcontroller.insert);



module.exports = router;
