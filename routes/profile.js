var express = require('express');
var router = express.Router();
var projectcontroller = require("../controllers/ProjectController");


/* GET home page. */
router.get('/', async(req, res) => {
  await projectcontroller.getprojects(req , res);  
});



router.post('/InsertProject', projectcontroller.insert);
module.exports = router;
